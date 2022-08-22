<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
     /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $product = Product::withTrashed()->with(['categories', 'media'])->orderBy('id', 'DESC')->paginate(20);

        return $product;
    }

    public function discount()
    {
        $product = Product::whereNotNull('discount')->orderBy('id', 'DESC')->paginate(20);

        return $product;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'name' => 'required|string',
            'sku' => 'string',
            'description' => 'string',
            'ingredents' => 'string',
            'discount' => 'numeric',
            'price' => 'numeric|required',
            'quantity' => 'numeric|required'
        ]);

        $product = Product::create($fields);

        if($request->hasFile('featured_img')){
            $product->addMediaFromRequest('featured_img')->toMediaCollection('images');
        }

        if($categories = $request->input('categories')){
            foreach($categories as $category){
                $product->categories()->attach($category);
            }
        }

        if($addons = $request->input('addons')){
            foreach($addons as $addon){
                $product->addons()->attach($addon);
            }
        }

        return $product;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Product::find($id)->load([ 'categories', 'media']);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $fields = $request->validate([
            'name' => 'required|string',
            'sku' => 'string',
            'description' => 'string',
            'ingredents' => 'string',
            'price' => 'numeric|required',
            'quantity' => 'numeric|required'
        ]);

        $product = Product::find($id);

        $product->update($fields);

        if($request->hasFile('featured_img')){
            $product->addMediaFromRequest('featured_img')->toMediaCollection('images');
        }

        if($categories = $request->input('categories')){
            foreach($categories as $category){
                $product->categories()->attach($category);
            }
        }

        if($addons = $request->input('addons')){
            foreach($addons as $addon){
                $product->addons()->attach($addon);
            }
        }

        $product->refresh()->load([ 'categories', 'media']);

        return $product;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $product = Product::withTrashed()->find($id);

        $deleted = $product->forceDelete();

        return $deleted;
    }
}
