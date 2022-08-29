<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Illuminate\Auth\Events\PasswordReset;
use App\Models\User;

class AuthController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {
        $fields = $request->validate([
            'name' => 'required|string',
            'username' => 'unique:users,username|string',
            'email' => 'required|string|unique:users,email',
            'phone' => 'max:255|unique:users,phone',
            'password' => 'required|string|confirmed'
        ]);

        $hash = md5(strtolower(trim($fields['email'])));

        $user = User::create([
            'name' =>  $fields['name'],
            'email' => $fields['email'],
            'username' => strtolower($fields['username'] || ''),
            'avatar' => 'https://www.gravatar.com/avatar/'.$hash,
            'password' => bcrypt($fields['password'])
        ]);

        $nameArr = explode(' ', $fields['name']);

        $user->profile()->create([
            'firstname' => $nameArr[0],
            'lastname' => $nameArr[1],
            'phone' => $fields['phone']
        ]);

        $user->assignRole('customer');

        $request->session()->regenerate();

        $token = auth()->user()->createToken('access_token')->plainTextToken;

        auth()->user()->generate_code();

        $response = [
            'user' => auth()->user()->load(['roles', 'profile']),
            // 'notifications' => [
            //     'data' => $notifications,
            //     'count' => $count
            // ],
            'token' => $token
        ];

        return $response;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string',
            'password' => 'required|string'
        ]);

        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
           $request->session()->regenerate();

            auth()->user()->generate_code();

            $token = auth()->user()->createToken('access_token')->plainTextToken;
            // $notifications = auth()->user()->notifications;
            // $count = auth()->user()->unreadNotifications->count();

            $response = [
                'user' => auth()->user(),
                // 'notifications' => [
                //     'data' => $notifications,
                //     'count' => $count
                // ],
                'token' => $token
            ];

            return $response;
        }

        return response([
            'message' => 'invalid credentials'
        ], 401);
    }

    public function api_login(Request $request)
    {
        $request->validate([
            'email' => 'required|string',
            'password' => 'required|string'
        ]);

        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $token = auth()->user()->createToken('access_token')->plainTextToken;
            // $notifications = auth()->user()->notifications;
            // $count = auth()->user()->unreadNotifications->count();

            $response = [
                'user' => auth()->user(),
                // 'notifications' => [
                //     'data' => $notifications,
                //     'count' => $count
                // ],
                'token' => $token
            ];

            return $response;
        }

        return response([
            'message' => 'invalid credentials'
        ], 401);
    }

    public function me() {
        $user = auth()->user()->load(['roles', 'profile']);
        // $notifications = auth()->user()->notifications;
        // $count = auth()->user()->unreadNotifications->count();

        // $response = [
        //     'user' => $user,
        //     // 'notifications' => [
        //     //     'data' => $notifications,
        //     //     'count' => $count
        //     // ],
        // ];
        return $user;
    }

    public function logout(Request $request) {
        

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        auth()->user()->tokens()->delete();

       // Auth::logout();

        return redirect('/');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $user = auth()->user();

        $fields = $request->validate([
            'firstname' => 'required|string',
            'lastname' => 'required|string',
            'username' => 'string',
        ]);

        $username = $request->only('username') || $user->username;

        $user->update([
            'name' =>  $fields['firstname'] . ' ' . $fields['lastname'],
            'username' => strtolower($username),
        ]);

        $user->profile()->update($request->except(['avatar', '_method', 'email', 'username' ]));

        if ($request->hasFile('avatar')) {
            $user->clearMediaCollection('avatars');

            $user->addMediaFromRequest('avatar')->toMediaCollection('avatars');
    
            $mediaUrl = $user->getFirstMediaUrl('avatars');
    
            $user->update([
                'avatar' => $mediaUrl,
            ]);
        }

        $user->refresh()->load(['profile','roles']);

        // $response = [
        //     'user' => $user,
        // ];

        return $user;
    }

    public function changePass(Request $request)
    {
        $user = auth()->user();

        $fields = $request->validate([
            'password' => 'required|string',
            'new_password' => 'required|string|confirmed'
        ]);

        if(!Hash::check($fields['password'], $user->password)) {
            return response([
                'message' => 'wrong password'
            ], 401);
        }

        if(!$user->email_verified_at) {
            $user->markEmailAsVerified();
        }
        $user->update([
            'password' => bcrypt($fields['new_password']),
        ]);

        return response([
            'message' => 'password update successful'
        ]);
    }

    public function forgotPass(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $status = Password::sendResetLink(
            $request->only('email')
        );

        return $status === Password::RESET_LINK_SENT
                    ? response('Please check your email for the reset link')
                    : response($status, 401);
    }

    public function resetPass(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:8|confirmed',
        ]);
    
        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) use ($request) {
                $user->forceFill([
                    'password' => Hash::make($password)
                ])->setRememberToken(Str::random(60));
    
                $user->save();
    
                event(new PasswordReset($user));
            }
        );
    
        return $status == Password::PASSWORD_RESET
                    ? response('Password reset successfully')
                    : response($status, 401);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy()
    {
        $user = Auth::user();

        $deleted = $user->forceDelete();

        //Mail::to($user)->send(new UserDelete($user->profile));

        return $deleted;
    }
}
