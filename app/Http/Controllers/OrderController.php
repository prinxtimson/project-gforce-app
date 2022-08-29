<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\OrderStatus;
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
        $request->validate([
            'total' => 'required|string',
            'mode' => 'required|string',
            'delivery_cost' => 'numeric',
            'items' => 'array',
            'loyalty_point' => 'numeric',
        ]);

       // $status = OrderStatus::where('slu');

        $order = Order::create($request->except(['items']));
        $items = $request->only('items');
        
        foreach($items as $item){
            $order->items()->create($item);
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
