<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\Image\Manipulations;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Product extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia, SoftDeletes;

    protected $fillable = [
        'name',
        'featured_image',
        'sku',
        'description',
        'ingredents',
        'price',
        'discount',
        'quantity'
    ];

    // protected $casts = [
    //     'description' => 'array',
    //     'ingredents' => 'array',
    // ];

    public function categories ()
    {
        return $this->belongsToMany(Category::class, 'product_categories');
    }

    public function addons ()
    {
        return $this->belongsToMany(Addon::class, 'product_addons');
    }

    public function reviews ()
    {
        return $this->hasMany(ProductReview::class);
    }

    public function registerMediaConversions(Media $media = null): void
    {
        $this->addMediaConversion('preview')->fit(Manipulations::FIT_CROP, 300, 300)->nonQueued();
    }
}
