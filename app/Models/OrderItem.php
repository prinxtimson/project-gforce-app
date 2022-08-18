<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'product',
        'type',
        'quantity',
        'price',
        'allergies',
        'preference',
        'status'
    ];

    protected $casts = [
        'product' => 'array',
    ];

    public function order()
    {
        $this->belongsTo(Order::class);
    }
}
