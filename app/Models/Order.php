<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'firstname',
        'lastname',
        'email',
        'phone',
        'mode',
        'status_id',
        'payment_mode',
        'is_payment',
        'delivery_cost',
        'loyalty_point',
        'discount',
        'billing_address',
        'delivery_address'
    ];

    protected $cast = [
        'billing_address' => 'object',
        'delivery_address' => 'object'
    ];

    public function user()
    {
       return $this->belongsTo(User::class);
    }

    public function items()
    {
       return $this->hasMany(OrderItem::class);
    }

    public function status()
    {
       return $this->belongsTo(Status::class);
    }
}
