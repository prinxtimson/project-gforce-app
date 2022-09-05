<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Delivery extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'address',
        'status',
        'dispatcher_id'
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function dispatcher()
    {
        return $this->belongsTo(Dispatcher::class);
    }
}
