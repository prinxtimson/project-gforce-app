<?php

namespace App\Exports;

use App\Models\QualityCheck;
use Maatwebsite\Excel\Concerns\FromCollection;

class QualityCheckExport implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return QualityCheck::all();
    }
}
