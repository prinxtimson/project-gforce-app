<?php

namespace App\Exports;

use App\Models\OrderItem;
use App\Models\Product;
use Carbon\Carbon;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithCustomStartCell;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Events\AfterSheet;

class DiscountExport implements FromArray, WithMapping, ShouldAutoSize, WithHeadings, WithEvents, WithCustomStartCell, WithTitle
{
    use Exportable;
    
    public function array(): array
    {

        $products =  Product::whereNotNull('discount')->where('discount', '>', 0)->orderBy('id', 'DESC')->get()->toArray();

        // $order_items = OrderItem::whereBetween('created_at', [Carbon::now()->startOfMonth(), Carbon::now()->endOfMonth()])->selectRaw("* COUNT(product_id) as count")->groupBy('product_id')->orderBy('count', 'desc')->get();

        //$_products = [];

        // $_products = array_map(function ($val) {
        //     foreach($order_items as $item){

        //     }
        // }, $products);

        return $products;
    }

    public function map($user): array
    {

        return [
            $user['id'],
            $user['name'],
            $user['quantity'],
            $user['price'],
            $user['discount_price'],
            $user['created_at']
        ];
    }

    public function headings(): array
    {
        return [
        
            'ID',
            'Name',
            'Quantity Sold',
            'Price',
            'Discount Price',
            'Created At'
        ];
    }

    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function(AfterSheet $event) {
                $event->sheet->getStyle('B3:G3')->applyFromArray([
                    'font' => [
                        'bold' => true,
                    ],
                ]);
            },
        ];
    }

    public function startCell(): string
    {
        return 'B3';
    }

    public function title(): string
    {
        return 'Discount Sales';
    }
}
