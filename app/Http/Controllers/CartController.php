<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
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
        
        if($cart_id  = $request->input('cart_id')){
            $cart = Cart::find($cart_id);
            $cart_items = $request->input('cart_items');
            foreach($cart_items as $item){
                $cart->cart_items()->updateOrCreate(['product_id' => $item['product_id']], $item);
            }

            return $cart->refresh()->load('cart_items');
        }else {
            $cart = Cart::create([]);
            $cart_items = $request->input('cart_items');
            foreach($cart_items as $cart_item){
                $cart->cart_items()->updateOrCreate(['product_id'=> $cart_item['product_id']], $cart_item);
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
        //
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
