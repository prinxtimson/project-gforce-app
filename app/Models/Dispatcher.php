<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dispatcher extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'availability',
        'phone',
        'status',
        'description',
        'rating'
    ];

    public function delivery()
    {
        return $this->hasMany(Delivery::class);
    }
}
