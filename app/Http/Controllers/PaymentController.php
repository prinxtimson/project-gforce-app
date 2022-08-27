<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Illuminate\Http\Request;

use Stripe;

class PaymentController extends Controller
{
    
    public function checkout (Request $request) {
        Stripe\Stripe::setApiKey('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

        $cart_items = Cart::find($request->input('cart_id'))->cart_items();

        $amount=0;

        foreach($cart_items as $item){
            $amount = $amount + ($item->quantity * $item->price);
        }


        $paymentIntent = Stripe\PaymentIntent::create([
            'amount' => $amount,
            'currency' => 'usd',
            'automatic_payment_methods' => [
                'enabled' => true,
            ],
        ]);
    
        $response = [
            'client_secret' => $paymentIntent->client_secret,
        ];
    
        return $response;
    }
}
