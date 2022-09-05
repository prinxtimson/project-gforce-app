<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Status;
use App\Models\User;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $orders = Order::withTrashed()->with('status')->orderBy('id', 'DESC')->paginate(20);

        return $orders;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = User::find(auth()->user()->id)->load('profile');

        if(!$user){
            $fields = $request->validate([
                'firstname' => 'required|string',
                'lastname' => 'required|string',
                'email' => 'required|string',
                'phone' => 'required|string', 
            ]);

            $billing_add = $request['billing_address']->validate([
                'address1' => 'required|string',
                'address2' => 'string',
                'city' => 'required|string',
                'postal_code' => 'required|stringh'
            ]);

            $delivery_add = $request->get('delivery_address');

            $cart = Cart::find($request->get('cart_id'))->load(['discount', 'cart_items' => function ($q) {
                return $q->load('product');
            }]);

            $status = Status::where('slug', 'new-order');

            $order = Order::create([
                'mode' => $cart->mode,
                'status_id' => $status->id,
                'discount' => $cart->discount->percentage,
                'firstname' => $fields['firstname'],
                'lastname' => $fields['lastname'],
                'email' => $fields['email'],
                'phone' => $fields['phone'],
                'delivery_cost' => $cart->mode == 'Eat-Out' ? 20 : 0,
                'billing_address' => json_encode($billing_add),
                'delivery_address' => json_encode($delivery_add)
            ]);

            foreach($cart->cart_items as $item){
                $order->order_items()->create([
                    'product_id' => $item['product_id'],
                    'quantity' => $item['quantity'],
                    'price' => $item['discount'] ? $item['discount'] : $item['price'],
                    'allergies' => $item['allergies'],
                    'preferences' => $item['preference']
                ]);
            }

            return $order;
        }else {
            $billing_add = $request['billing_address']->validate([
                'address1' => 'required|string',
                'address2' => 'string',
                'city' => 'required|string',
                'postal_code' => 'required|stringh'
            ]);

            $delivery_add = $request->get('delivery_address');

            $cart = Cart::find($request->get('cart_id'))->load(['discount', 'cart_items' => function ($q) {
                return $q->load('product');
            }]);

            $status = Status::where('slug', 'new-order');

            $order = Order::create([
                'mode' => $cart->mode,
                'user_id' => $user->id,
                'status_id' => $status->id,
                'discount' => $cart->discount->percentage,
                'firstname' => $user->profile->firstname,
                'lastname' => $user->profile->lastname,
                'email' => $user->email,
                'phone' => $user->profile->phone,
                'delivery_cost' => $cart->mode == 'Eat-Out' ? 20 : 0,
                'billing_address' => json_encode($billing_add),
                'delivery_address' => json_encode($delivery_add)
            ]);

            foreach($cart->cart_items as $item){
                $order->order_items()->create([
                    'product_id' => $item['product_id'],
                    'quantity' => $item['quantity'],
                    'price' => $item['discount'] ? $item['discount'] : $item['price'],
                    'allergies' => $item['allergies'],
                    'preferences' => $item['preference']
                ]);
            }

            return $order;
        }
 
    }
 
    public function search(Request $request)
    {
        $from = $request->get('from');
        $to = $request->get('to');
        $order_items = OrderItem::whereBetween('created_at', [$from, $to])->selectRaw("* COUNT(product_id) as count")->groupBy('product_id')->orderBy('count', 'desc')->get();

        return $order_items;

    }

    public function cancel($id) {
        $order = Order::find($id);

        foreach ($order->items as $item) {
            $item->delete();
        }

        return $order->delete();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Order::find($id)->with(['user', 'items', 'status']);
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

        $product = Order::find($id);

        $product->update($fields);

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
        $product = Order::withTrashed()->find($id);

        $deleted = $product->forceDelete($id);

        return $deleted;
    }
}
