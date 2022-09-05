<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Order;
use App\Models\Payment;
use Illuminate\Http\Request;

use Stripe;

class PaymentController extends Controller
{
    public function index()
    {
        $payments = Payment::orderBy('id', 'DESC')->paginate(20);

        return $payments;
    }
    
    public function checkout (Request $request) {
        $stripe = new Stripe\StripeClient('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

        $cart_items = Cart::find($request->get('cart_id'))->cart_items();

        $total=0;

        foreach($cart_items as $item){
            $total = $total + ($item->quantity * $item->price);
        }

        $mode = $request->get('mode');

        $order = Order::create([
            'total' => $total,
            'mode' => $mode,
            'delivery_cost' => $mode === 'Delivery' ? 10 : 0,
        ]);

        $order->order_items()->createMany($cart_items);

        $paymentIntent = $stripe->paymentIntents->create([
            'amount' => $total ,
            'currency' => 'gbp',
            'automatic_payment_methods' => [
                'enabled' => true,
            ],
            'metadata' => [
                'order_id' => $order->id,
              ],
        ]);
    
        $response = [
            'client_secret' => $paymentIntent->client_secret,
        ];
    
        return $response;
    }

    public function make_payment(Request $request)
    {
        $order = Order::find($request->get('order_id'));

        $stripe = new Stripe\StripeClient('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

        $stripe->charge->create ([
                "amount" => $order['total'] * 100,
                "currency" => "usd",
                "source" => $request->stripeToken,
                "description" => "This payment is tested purpose phpcodingstuff.com"
        ]);


    }

        /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Payment::find($id)->load([ 'order']);
    }

    public function refund($id)
    {

    }
}
