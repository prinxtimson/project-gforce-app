<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory, SoftDeletes;

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
