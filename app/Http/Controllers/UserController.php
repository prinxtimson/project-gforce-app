<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\Request;
use App\Models\User;
use App\Mail\NewUser;
use Carbon\Carbon;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::withTrashed()->with(['roles' => function($q){
            $q->where('name', '!=', 'customer');
        }])->orderBy('id', 'DESC')->paginate(20);

        return $users;
    }

    public function active_customers()
    {
        $customers = User::role('customer')->with(['loyalty', 'profile'])->orderBy('loyalty.total_spent', 'DESC')->paginate(20);

        return $customers;
    }

    public function monthly_birthday()
    {
        $user =  User::role('customer')->withWhereHas('profile', function ($query) {
            $query->whereBetween('date_of_birth', [Carbon::now()->startOfMonth(), Carbon::now()->endOfMonth()]);
        })->with('loyalty')->paginate(20);

        return $user;
    }

    public function customers()
    {
        $customers = User::role('customer')->with(['loyalty', 'profile', 'addresses'])->orderBy('id', 'DESC')->paginate(20);

        return $customers;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'firstname' => 'required|string',
            'lastname' => 'required|string',
            'role' => 'required|string',
            'email' => 'required|string|unique:users,email',
            'password' => 'required|string'
        ]);

        $hash = md5(strtolower(trim($fields['email'])));

        $user = User::create([
            'name' =>  $fields['firstname'].' '.$fields['lastname'],
            'email' => $fields['email'],
            'username' => strtolower($fields['firstname'].$fields['lastname']),
            'avatar' => 'https://www.gravatar.com/avatar/'.$hash,
            'password' => bcrypt($fields['password'])
        ]);

        $user->profile()->create([
            'firstname' => $fields['firstname'],
            'lastname' => $fields['lastname'],
        ]);

        $user->assignRole($fields['role']);

        //event(new NewUserAdded($fields));
        Mail::to($user)->send(new NewUser($fields));

        $response = [
            'user' => $user,
            'msg' => 'User added successfully.'
        ];

        return $response;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return User::find($id)
        ->load(['profile', 'roles']);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $fields = $request->validate([
            'firstname' => 'required|string',
            'lastname' => 'required|string',
        ]);

        $user = User::find($id);
        
        $username = $request->only('username') || $user->username;

        $user->update([
            'name' =>  $fields['firstname'] .' '. $fields['lastname'],
            'username' => strtolower($username),
        ]);

        $user->profile()->update($request->except(['avatar', '_method' ]));

        if ($request->hasFile('avatar')) {
            $user->clearMediaCollection('avatars');

            $user->addMediaFromRequest('avatar')->toMediaCollection('avatars');
    
            $mediaUrl = $user->getFirstMediaUrl('avatars');
    
            $user->update([
                'avatar' => $mediaUrl,
            ]);
        }

        $user->refresh()->load(['profile', 'roles']);

        $response = [
            'user' => $user,
            'msg' => 'User updated successfully.'
        ];

        return $response;
    }

    public function disable($id)
    {
        User::find($id)->delete();

        $user = User::withTrashed()->find($id)->load(['profile', 'roles']);

        //Mail::to($user)->send(new UserDeactivate($user->profile));

        return $user;
    }

    public function enable($id)
    {
        User::withTrashed()->find($id)->restore();

        $user = User::withTrashed()->find($id)->load(['profile', 'roles']);

        //Mail::to($user)->send(new UserReactivate($user->profile));

        return $user;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = User::withTrashed()->find($id)->load(['roles']);

        $deleted = $user->forceDelete();

        //Mail::to($user)->send(new UserDelete($user->profile));

        return $deleted;
    }
}
