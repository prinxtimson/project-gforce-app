<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CustomerAddress extends Model
{
    use HasFactory;

    protected $fillable = [
        'address_line1',
        'address_line2',
        'city',
        'state',
        'country',
        'phone',
        'is_default'
    ];

    public function user()
    {
        $this->belongsTo(User::class);
    }
}
