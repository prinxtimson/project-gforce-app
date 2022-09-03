<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CartItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'quantity',
        'price',
        'discount',
        'allergies',
        'preference',
    ];

    protected $cast = [
        'allergies' => 'array',
        'preference' => 'array'
    ];

    public function cart()
    {
       return $this->belongsTo(Cart::class);
    }

    public function product()
    {
       return $this->belongsTo(Product::class);
    }
}
