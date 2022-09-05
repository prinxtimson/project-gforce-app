<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'mode',
        'loyalty_point',
    ];

    public function discount()
    {
        return $this->hasOne(Discount::class);
    }

    public function cart_items()
    {
       return $this->hasMany(CartItem::class);
    }
}
