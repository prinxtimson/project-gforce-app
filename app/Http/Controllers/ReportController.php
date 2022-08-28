<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Status;
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

    public function most_selling_by_period (Request $request)
    {
        $period = $request->get('period');

        if($period == 'day'){
            $order_items = OrderItem::whereBetween('created_at', [Carbon::now()->startOfDay(), Carbon::now()->endOfDay()])->with(['reviews'])->selectRaw("* COUNT(product_id) as count")->groupBy('product_id')->orderBy('count', 'desc')->get();

            return $order_items;
        }else if($period == 'week'){
            $order_items = OrderItem::whereBetween('created_at', [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()])->with(['reviews'])->selectRaw("* COUNT(product_id) as count")->groupBy('product_id')->orderBy('count', 'desc')->get();

            return $order_items;
        }else if($period == 'month'){
            $order_items = OrderItem::whereBetween('created_at', [Carbon::now()->startOfMonth(), Carbon::now()->endOfMonth()])->with(['reviews'])->selectRaw("* COUNT(product_id) as count")->groupBy('product_id')->orderBy('count', 'desc')->get();

            return $order_items;
        }else {
            $most_selling = OrderItem::with(['reviews'])->selectRaw("COUNT(product_id) as count")->groupBy('product_id')->orderBy('count', 'desc')->paginate(10);

            return $most_selling;
        }

    }

    public function report ()
    {
        $orders = Order::count();
        $customers = User::role('customer')->count();
        $foods = Product::whereHas('categories', function($q){
            $q->where('slug', 'meal');
        })->count();

        $order_items = OrderItem::whereDate('created_at', Carbon::today())->selectRaw("COUNT(product_id) as count")->groupBy('product_id')->orderBy('count', 'desc')->paginate(10);

        $most_selling = OrderItem::with(['reviews'])->selectRaw("COUNT(product_id) as count")->groupBy('product_id')->orderBy('count', 'desc')->paginate(10);

        $res = [
            'orders' => $orders,
            'customers' => $customers,
            'foods' => $foods,
            'reservations' => 0,
            'daily_trend' =>$order_items['data'],
            'most_selling' => $most_selling['data'],
        ];

        return $res;
    }

    public function get_order_report () 
    {
        $new_orders = Status::with('orders')->get();
        // $pre_orders = OrderStatus::where('name', 'Prepering')->get()->orders->count();
        // $ready_orders = OrderStatus::where('name', 'Ready')->get()->orders->count();
        // $served_orders = OrderStatus::where('name', 'Served')->get()->orders->count();
        // $in_transit_orders = OrderStatus::where('name', 'In-Transit')->get()->orders->count();
        // $delivered_orders = OrderStatus::where('name', 'Delivered')->get()->orders->count();
        $canceled_orders = Order::onlyTrashed()->get();

        $response = [
            'new_orders' => $new_orders,
            // 'pre_orders' => $pre_orders,
            // 'ready_orders' => $ready_orders,
            // 'served_orders' => $served_orders,
            // 'in_transit_orders' => $in_transit_orders,
            // 'delivered_orders' => $delivered_orders,
            'canceled_orders' => $canceled_orders
        ];

        return $response;
    }
}
