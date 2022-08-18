<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Discount extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'percentage',
        'code',
        'end_at'
    ];

    protected $casts = [
        'end_at' => 'date',
    ];

}
