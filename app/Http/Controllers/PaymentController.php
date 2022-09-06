<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Order;
use App\Models\Payment;
use App\Models\User;
use Illuminate\Http\Request;
use Laravel\Cashier\Cashier;
use Illuminate\Support\Facades\Auth;

class PaymentController extends Controller
{
    public function index()
    {
        $payments = Payment::orderBy('id', 'DESC')->paginate(20);

        return $payments;
    }
    
    public function create (Request $request) {
        $fields = $request->validate([
            'amount' => 'required',
            'provider' => 'required',
            'channel' => 'required'
        ]);

        $order = Order::find($request->get('order_id'))->load('order_items');

            $payment = $order->payment()->create([
                'amount' => $fields['amount'],
                'provider' => $fields['provider'],
                'channel' => $fields['channel'],
                'stripe_payment_id' => 'test',
                'status' => 'successful'
            ]);

            $order->update(['is_payment' => true]);

        return $payment;
    }

    public function make_payment(Request $request)
    {
        $fields = $request->validate([
            'order_id' => 'required',
            'type' => 'required|string',
            'cc_num' => 'required|string',
            'cc_exp_month' => 'required|numeric',
            'cc_exp_year' => 'required|numeric',
            'cc_cvc' => 'required|string',
            'cc_name' => 'required|string',
            'email' => 'string',
        ]);

        $order = Order::find($request->get('order_id'))->load('items');

        $paymentMethod = Cashier::stripe()->paymentMethods->create([
            'type' => $fields['type'],
            'card' => [
                'number' => $fields['cc_num'],
                'exp_month' => $fields['cc_exp_month'],
                'exp_year' => $fields['cc_exp_year'],
                'cvc' => $fields['cc_cvc'],
              ],
            
            'billing_details' => [
                'name' => $fields['cc_name'],
                'email' => $fields['email'],
            ]
        ]);

        $total= $order->delivery_cost ? $order->delivery_cost : 0;

        foreach($order->items as $item){
            $total = $total + ($item->quantity * $item->price);
        }

        $amount = $total * 100;

        try {
            $charge = $request->user()->charge($amount, $paymentMethod->id, ['metadata' => ["order_id" => $order->id]]);

            $order->update(['is_payment' => true]);

            $payment = $order->payment()->create([
                'amount' => $total,
                'provider' => $charge->charges->data[0]->payment_method_details->type,
                'stripe_payment_id' => $charge->id,
                'channel' => 'Online Payment',
                'status' => $charge->status
            ]);

            return $payment;
            
        }catch(\Exception $e){
            return response($e, 400);
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
        return Payment::find($id)->load([ 'order']);
    }

    public function refund(Request $request, $id)
    {
        $request->validate([
            'user_id' => 'required'
        ]);
        $user = User::find($request->get('user_id'));
        $payment = Payment::find($id);

        $user->refund($payment->stripe_payment_id);

        $payment->update(['status' => 'refund']);

        return ['msg' => 'Refund Successful'];
    }
}
