<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class OrderItem extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'product_name',
        'type',
        'quantity',
        'product_price',
        'product_img',
        'product_desc',
        'product_ingred',
        'allergies',
        'preference',
        'status'
    ];

    protected $casts = [
        'product' => 'array',
    ];

    public function order()
    {
       return $this->hasMany(Order::class);
    }

    public function reviews()
    {
        return $this->hasManyThrough(ProductReview::class, Product::class);
    }
}