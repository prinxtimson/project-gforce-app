<?php

namespace App\Exports;

use App\Models\Delivery;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithCustomStartCell;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Events\AfterSheet;

class DeliveryExport implements FromArray, WithMapping, ShouldAutoSize, WithHeadings, WithEvents, WithCustomStartCell, WithTitle
{
    use Exportable;
    
    public function array(): array
    {

        $delivery = Delivery::with(['dispatcher'])->get()->toArray();

        return $delivery;
    }

    public function map($delivery): array
    {

        return [
            $delivery['id'],
            $delivery['name'],
            $delivery['email'],
            $delivery['phone'],
            $delivery['dispatcher']['name'],
            $delivery['status'],
            $delivery['created_at']
        ];
    }

    public function headings(): array
    {
        return [
        
            'ID',
            'Name',
            'Email Address',
            'Phone Number',
            'Dispatcher',
            'Status',
            'Created At'
        ];
    }

    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function(AfterSheet $event) {
                $event->sheet->getStyle('B3:H3')->applyFromArray([
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
        return 'Delivery Report';
    }
}
