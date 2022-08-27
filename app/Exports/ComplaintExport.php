<?php

namespace App\Exports;

use App\Models\Complaint;
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

class ComplaintExport implements FromArray, WithMapping, ShouldAutoSize, WithHeadings, WithEvents, WithCustomStartCell, WithTitle
{
    use Exportable;
    
    public function array(): array
    {

        $complaint = Complaint::whereBetween('created_at', [
            Carbon::now()->startOfMonth(), Carbon::now()->endOfMonth()
            ])->get()->toArray();

        return $complaint;
    }

    public function map($user): array
    {

        return [
            $user['id'],
            $user['name'],
            $user['email'],
            $user['phone'],
            $user['complain'],
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
            'Complain',
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
        return 'Complaint Report';
    }
}
