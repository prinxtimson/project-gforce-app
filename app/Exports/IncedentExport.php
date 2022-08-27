<?php

namespace App\Exports;

use App\Models\Incedent;
use Maatwebsite\Excel\Concerns\FromCollection;

class IncedentExport implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Incedent::all();
    }
}
