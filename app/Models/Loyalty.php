<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Loyalty extends Model
{
    use HasFactory;

    protected $fillable = [
        'point',
        'total_spent',
        'last_order',
    ];

    public function user()
    {
        $this->belongsTo(User::class);
    }
}
