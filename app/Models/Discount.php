<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Discount extends Model
{
    use HasFactory, SoftDeletes;

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

    public function carts()
    {
        return $this->hasMany(Cart::class);
    }
}
