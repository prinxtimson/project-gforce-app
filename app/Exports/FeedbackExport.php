<?php

namespace App\Exports;

use App\Models\ProductReview;
use Maatwebsite\Excel\Concerns\FromCollection;

class FeedbackExport implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return ProductReview::all();
    }
}
