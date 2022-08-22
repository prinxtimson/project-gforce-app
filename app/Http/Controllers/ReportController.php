<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    //
    public function search(Request $request)
    {
        $from = $request->get('from');
        $to = $request->get('to');
        $order_items = OrderItem::whereBetween('created_at', [$from, $to])->selectRaw("* COUNT(product_id) as count")->groupBy('product_id')->orderBy('count', 'desc')->get();

        return $order_items;

    }

    public function report ()
    {
        $orders = Order::count();
        $customers = User::role('customer')->count();
        $foods = Product::whereHas('categories', function($q){
            $q->where('slug', 'meal');
        })->count();

        $order_items = OrderItem::whereDate('created_at', Carbon::today())->selectRaw("COUNT(product_id) as count")->groupBy('product_id')->orderBy('count', 'desc')->paginate(10);

        $res = [
            'orders' => $orders,
            'customers' => $customers,
            'foods' => $foods,
            'reservations' => 0,
            'daily_trend' =>$order_items['data'],
        ];

        return $res;
    }
}
