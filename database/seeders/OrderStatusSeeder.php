<?php

namespace Database\Seeders;

use App\Models\Status;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OrderStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $statuses = [
            [
                'name' => 'New Order',
                'slug' => 'new-order',
                'description' => 'New Order received',
            ],
            [
                'name' => 'Processing',
                'slug' => 'processing',
                'description' => 'Order is under preperation',
            ],
            [
                'name' => 'Ready',
                'slug' => 'ready',
                'description' => 'Order is ready',
            ],
            [
                'name' => 'Served',
                'slug' => 'served',
                'description' => 'Order is served',
            ],
            [
                'name' => 'In-Transit',
                'slug' => 'in-transit',
                'description' => 'Order is in transit',
            ],
            [
                'name' => 'Delivered',
                'slug' => 'delivered',
                'description' => 'Order is delivered',
            ],
            [
                'name' => 'Canceled',
                'slug' => 'canceled',
                'description' => 'Order Canceled',
            ]
        ];

        foreach($statuses as $status) {
            Status::create($status);
        }
    }
}
