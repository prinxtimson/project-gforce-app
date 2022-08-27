<?php

namespace App\Exports;

use App\Models\ProductReview;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithCustomStartCell;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Events\AfterSheet;

class FeedbackExport implements FromArray, WithMapping, ShouldAutoSize, WithHeadings, WithEvents, WithCustomStartCell, WithTitle
{
    use Exportable;
    
    public function array(): array
    {

        $reviews = ProductReview::with(['user'])->get()->toArray();

        return $reviews;
    }

    public function map($data): array
    {

        return [
            $data['id'],
            $data['user']['name'],
            $data['rating'],
            $data['comment'],
            $data['created_at']
        ];
    }

    public function headings(): array
    {
        return [
        
            'ID',
            'Customer Name',
            'Rating',
            'Comment',
            'Created At'
        ];
    }

    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function(AfterSheet $event) {
                $event->sheet->getStyle('B3:F3')->applyFromArray([
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
        return 'Feedback Report';
    }
}
