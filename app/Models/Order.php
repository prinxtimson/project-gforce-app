<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'total',
        'mode',
        'delivery_cost',
        'loyalty_point',
        'discount'
    ];

    protected $casts = [
        'discount' => 'array',
    ];

    public function user()
    {
        $this->belongsTo(User::class);
    }

    public function items()
    {
        $this->hasMany(OrderItem::class);
    }

    public function status()
    {
        $this->hasOne(OrderStatus::class);
    }
}
