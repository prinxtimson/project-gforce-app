<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CustomerPayment extends Model
{
    use HasFactory;

    protected $fillable = [
        'payment_type',
        'account_no',
        'provider',
        'expiry',
        'is_default',
    ];

    public function user()
    {
       return $this->belongsTo(User::class);
    }
}
