<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CartItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'quantity',
        'price',
        'allergies',
        'preference',
    ];

    public function cart()
    {
        $this->belongsTo(Cart::class);
    }

    public function product()
    {
        $this->belongsTo(Product::class);
    }
}
