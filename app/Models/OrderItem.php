<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class OrderItem extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'product_id',
        'quantity',
        'price',
        'allergies',
        'preferences',
        'status'
    ];

    protected $cast = [
        'allergies' => 'array',
        'preferences' => 'array'
    ];

    public function order()
    {
       return $this->belongsTo(Order::class);
    }

    public function product()
    {
       return $this->belongsTo(Product::class);
    }

    public function reviews()
    {
        return $this->hasManyThrough(ProductReview::class, Product::class);
    }
}