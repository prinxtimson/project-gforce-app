<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\Image\Manipulations;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Product extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    protected $fillable = [
        'name',
        'sku',
        'description',
        'ingredents',
        'price',
        'quantity'
    ];

    protected $casts = [
        'description' => 'array',
        'ingredents' => 'array',
    ];

    public function categories ()
    {
        return $this->belongsToMany(Category::class);
    }

    public function addons ()
    {
        return $this->belongsToMany(Addon::class);
    }

    public function reviews ()
    {
        return $this->hasMany(Review::class);
    }

    public function registerMediaConversions(Media $media = null): void
    {
        $this
            ->addMediaConversion('preview')
            ->fit(Manipulations::FIT_CROP, 300, 300)
            ->nonQueued();
    }
}
