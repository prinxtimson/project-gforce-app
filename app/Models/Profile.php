<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    use HasFactory;
    protected $fillable = [
        'firstname',
        'lastname',
        'phone',
        'date_of_birth'
    ];

    protected $cast = [
        'date_of_birth' => 'date'
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }
}
