<?php

namespace App\Exports;

use App\Models\User;
use Carbon\Carbon;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithCustomStartCell;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Events\AfterSheet;

class BirthdayExport implements FromArray, WithMapping, ShouldAutoSize, WithHeadings, WithEvents, WithCustomStartCell, WithTitle
{
    public function __construct()
    {
        //
    }

    public function array(): array
    {

        $user =  User::role('customer')->withWhereHas('posts', function ($query) {
            $query->whereBetween('date_of_birth', [Carbon::now()->startOfMonth(), Carbon::now()->endOfMonth()]);
        })->load('loyalty')->get();

        return $user;
    }

    public function map($user): array
    {

        return [
            $user['id'],
            $user['name'],
            $user['email'],
            $user['profile']['phone'],
            $user['profile']['date_of_birth'],
            $user['loyalty']['total_spent'],
            $user['created_at']
        ];
    }

    public function headings(): array
    {
        return [
        
            'ID',
            'Customer Name',
            'Email Address',
            'Phone Number',
            'Date of Birth',
            'Total Spent',
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
        return 'Monthly Birthday';
    }
}
