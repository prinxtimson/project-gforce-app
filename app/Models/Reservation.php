<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Reservation extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'firstname',
        'lastname',
        'email',
        'phone',
        'no_of_guest',
        'date',
        'start_at',
        'end_at',
        'status',
        'special_request',
        'is_approved'
    ];

    protected $casts =[
        'date' => 'date',
        'is_approved' => 'boolean'
    ];
}
