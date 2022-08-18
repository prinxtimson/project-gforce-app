<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductReview extends Model
{
    use HasFactory;

    protected $fillable = [
        'rating',
        'comment',
        'is_approved',
    ];

    public function product ()
    {
        $this->belongsTo(Product::class);
    }

    public function user ()
    {
        $this->belongsTo(User::class);
    }
}
