<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;

    protected $fillable = [
        'total',
        'delivery_cost',
        'loyalty_point',
    ];

    public function user()
    {
        $this->belongsTo(User::class);
    }

    public function discount()
    {
        $this->hasOne(Discount::class);
    }
}
