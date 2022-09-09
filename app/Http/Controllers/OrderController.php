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

    public function get_status()
    {
        return Status::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate(['cart_id' => 'required']);
        $fields = $request->validate([
            'firstname' => 'required|string',
            'lastname' => 'required|string',
            'email' => 'required|string',
            'phone' => 'required|string',
            'billing_address.address1' => 'required|string', 
            'billing_address.city' => 'required|string', 
            'billing_address.postal_code' => 'required|string', 
        ]);

        $user = auth()->user();

        $billing_add = $request->get('billing_address');

        $delivery_add = $request->get('delivery_address');

        $cart = Cart::find($request->get('cart_id'))->load([
            'discount', 'cart_items'
        ]);

        $status = Status::where('slug', 'new-order')->first();

        $order = Order::create([
                'mode' => $request->get('mode') ? $request->get('mode') : $cart->mode,
                'user_id' => $user ? $user->id : null,
                'status_id' => $status->id,
                'discount' => $cart->discount ? $cart->discount->percentage : null,
                'firstname' => $fields['firstname'],
                'lastname' => $fields['lastname'],
                'email' => $fields['email'],
                'phone' => $fields['phone'],
                'delivery_cost' => $request->get('mode') == 'Eat-Out' ? 20 : 0,
                'billing_address' => json_encode($billing_add),
                'delivery_address' => $delivery_add ? json_encode($delivery_add) : json_encode($billing_add)
            ]);
            $order->sub_total = 0;

            foreach($cart->cart_items as $item){
                $order->sub_total = $order->sub_total + $item['quantity'] * (property_exists($item, 'discount') ? $item['discount'] : $item['price']);

                $order->items()->create([
                    'product_id' => $item['product_id'],
                    'quantity' => $item['quantity'],
                    'price' => property_exists($item, 'discount') ? $item['discount'] : $item['price'],
                    'status' => $status->name,
                    'allergies' => property_exists($item, 'allergies') ? $item['allergies'] : null,
                    'preferences' => property_exists($item, 'preference') ? $item['preferences'] : null
                ]);
            }

            return $order;
 
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
        return Order::with('items.product')->find($id)->load(['user', 'status']);
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
            'firstname' => 'string',
            'lastname' => 'string',
            'email' => 'string',
            'phone' => 'string',
            'status_id' => 'numeric'
        ]);

        $product = Order::find($id);

        $product->update($fields);

        return $product->refresh()->load('status');
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
