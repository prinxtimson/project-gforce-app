<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Mail\TwoFactorAuth;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Support\Facades\Mail;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class User extends Authenticatable implements HasMedia
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes, InteractsWithMedia, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'avatar',
        'username',
        'email',
        'password',
    ];

    protected $guard_name = 'web';

    /**
     * The attributes that should be hidden for serialization.
     *
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function profile () 
    {
        return $this->hasOne(Profile::class);
    }

    public function user_code ()
    {
        return $this->hasOne(UserCode::class);
    }

    public function addresses ()
    {
        return $this->hasMany(CustomerAddress::class);
    }

    public function cards ()
    {
        return $this->hasMany(CustomerPayment::class);
    }

    public function generate_code ()
    {
        $code = rand(100000, 999999);

        $this->user_code()->updateOrCreate([
            'code' => $code
        ]);

        $receiverNum = $this->phone;
        $message = "Your Login OTP code is ". $code;

        try {
            // $account_sid = getenv("TWILIO_ACCOUNT_SID");
            // $auth_token = getenv("TWILIO_AUTH_TOKEN");
            // $number = getenv("TWILIO_FROM");
    
            // $client = new Client($account_sid, $auth_token);
            // $client->messages->create($receiverNum, [
            //     'from' => $number, 
            //     'body' => $message]);
            Mail::to($this)->send(new TwoFactorAuth($code, $this));
    
        } catch (\Exception $e) {
            error_log($e);
        }
    }
}
