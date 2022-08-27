<?php

namespace App\Exports;

use App\Models\User;
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

class CustomersExport implements FromArray, WithMapping, ShouldAutoSize, WithHeadings, WithEvents, WithCustomStartCell, WithTitle
{
    use Exportable;
    
    public function array(): array
    {

        $customer = User::role('customer')->whereBetween('created_at', [
            Carbon::now()->startOfMonth(), Carbon::now()->endOfMonth()
            ])->with(['loyalty', 'profile', 'addresses'])->get()->toArray();

        return $customer;
    }

    public function map($user): array
    {

        return [
            $user['id'],
            $user['name'],
            $user['email'],
            $user['profile']['phone'],
            $user['addresses'][0]['address_line1'],
            $user['loyalty']['total_spent'],
            $user['loyalty']['last_spent'],
            $user['created_at']
        ];
    }

    public function headings(): array
    {
        return [
        
            'ID',
            'Name',
            'Email Address',
            'Phone Number',
            'Address',
            'Total Spent',
            'Last Spent',
            'Created At'
        ];
    }

    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function(AfterSheet $event) {
                $event->sheet->getStyle('B3:I3')->applyFromArray([
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
        return 'Active Customers';
    }
}
