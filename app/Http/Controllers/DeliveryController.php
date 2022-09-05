<?php

namespace App\Http\Controllers;

use App\Models\Delivery;
use App\Models\Order;
use Illuminate\Http\Request;

class DeliveryController extends Controller
{
       /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $deliveries = Delivery::with(['dispatcher'])->orderBy('id', 'DESC')->paginate(20);
        return $deliveries;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate(['order_id' => 'required|numeric',]);

        $fields = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string',
            'phone' => 'required',
            'address' => 'required|string',
            'status' => 'string',
            'dispatcher_id' => 'required|numeric'
        ]);

        $order = Order::find($request->get('order_id'));
        
        $delivery = $order->delivery()->create($fields);

        return $delivery;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Delivery::find($id)->with(['order', 'dispatcher']);
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
            'name' => 'string',
            'email' => 'string',
            'phone' => 'string',
            'address' => 'string',
            'status' => 'string',
            'dispatcher_id' => 'numeric'
        ]);

        $delivery = Delivery::find($id);

        $delivery->update($fields);

        return $delivery;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $delivery = Delivery::find($id);

        return $delivery->delete();
    }
}
