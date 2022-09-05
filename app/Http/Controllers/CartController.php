<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Discount;
use App\Models\Product;
use Illuminate\Http\Request;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $carts = Cart::with(['cart_items'])->orderBy('id', 'DESC')->paginate(20);
        return $carts;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = auth()->user();

        if($cart_id  = $request->get('cart_id')){
            $cart = Cart::find($cart_id);
            $cart_items = $request->input('cart_items');
            foreach($cart_items as $item){
                $product = Product::find($item['product_id']);
                $cart->cart_items()->updateOrCreate(['product_id' => $item['product_id']], [
                    'product_id' => $item['product_id'],
                    'quantity' => $item['quantity'],
                    'price' => $product->price,
                    'discount' => $product->discount,
                    'allergies' => array_key_exists('allergies', $item) ? explode(',', $item['allergies']) : null,
                   'preferences' => array_key_exists('preference', $item) ? explode(',', $item['preferences']) : null
                ]);
            }

            return $cart->refresh()->load('cart_items');
        }else {
            $cart = Cart::create([
                'user_id' => $user ? $user->id : null,
                'mode' => 'Eat-Out'
            ]);
            $cart_items = $request->input('cart_items');
            foreach($cart_items as $item){
                $product = Product::find($item['product_id']);
                $cart->cart_items()->updateOrCreate(['product_id'=> $item['product_id']], [
                    'product_id' => $item['product_id'],
                   'quantity' => $item['quantity'],
                   'price' => $product->price,
                   'discount' => $product->discount,
                   'allergies' => array_key_exists('allergies', $item) ? explode(',', $item['allergies']) : null,
                   'preferences' => array_key_exists('preference', $item) ? explode(',', $item['preferences']) : null
                ]);
            }

            return $cart->refresh()->load('cart_items');
        }
        
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Cart::find($id)->load('cart_items');
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
            'mode' => 'required|string'
        ]);

        $cart = Cart::find($id);

        if($cart){
            $cart->update($fields);

            $cart->refresh()->load(['cart_items', 'discount']);

            return $cart;
        }

        return response(['message' => 'cart not find'], 400);
    }


    public function apply_discount(Request $request, $id)
    {
        $code = $request->get('discount_code');
        $cart = Cart::find($id);
        if($cart->discount){
            return ['message' => 'discount already attached to cart'];
        }
        $discount = Discount::where('code', $code);

        if($discount){
            $cart->discount()->attach($discount);

            $cart->refresh()->load(['cart_items', 'discount']);

            return $cart;
        }

        return response(['message' => 'wrong discount code'], 400);
    }


    public function remove_discount($id)
    {
        $cart = Cart::find($id);

        if(!$cart->discount){
            return ['message' => 'no discount attached to cart'];
        }
        
        $cart->discount()->delete();

        $cart->refresh()->load(['cart_items', 'discount']);

        return $cart;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $cart = Cart::find($id);

        return $cart->delete();
    }
}
