<?php

namespace Database\Seeders;

use App\Models\OrderStatus;
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
                'name' => 'Prepering',
                'slug' => 'prepering',
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
            ]
        ];

        foreach($statuses as $status) {
            OrderStatus::create($status);
        }
    }
}
