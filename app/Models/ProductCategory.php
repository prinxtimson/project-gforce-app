<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductCategory extends Model
{
    use HasFactory;

    public function product()
    {
        $this->hasOne(Product::class);
    }

    public function category()
    {
        $this->hasOne(Category::class);
    }
}
