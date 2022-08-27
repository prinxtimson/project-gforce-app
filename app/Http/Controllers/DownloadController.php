<?php

namespace App\Http\Controllers;

use App\Exports\BirthdayExport;
use App\Exports\ComplaintExport;
use App\Exports\CustomersExport;
use App\Exports\DeliveryExport;
use App\Exports\DiscountExport;
use App\Exports\FeedbackExport;
use App\Exports\IncedentExport;
use App\Exports\InventoryExport;
use App\Exports\PayrollExport;
use App\Exports\QualityCheckExport;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Excel;

class DownloadController extends Controller
{
    private $excel;

    public function __construct(Excel $excel)
    {
        $this->excel = $excel;
    }

    public function birthday(Request $request)
    {
        $type = $request->type;
        $date = Carbon::now()->getTimestamp();

        if($type == 'xlsx'){
            return (new BirthdayExport)->download('monthly_birthdays'.$date.'.'.$type, Excel::XLSX);
        }elseif($type == 'csv'){
            return (new BirthdayExport)->download('monthly_birthdays'.$date.'.'.$type, Excel::CSV);
        }elseif($type == 'pdf'){
            return (new BirthdayExport)->download('monthly_birthdays'.$date.'.'.$type, Excel::MPDF);
        }
    }

    public function complaint(Request $request)
    {
        $type = $request->type;
        $date = Carbon::now()->getTimestamp();

        if($type == 'xlsx'){
            return (new ComplaintExport)->download('complaint_report'.$date.'.'.$type, Excel::XLSX);
        }elseif($type == 'csv'){
            return (new ComplaintExport)->download('complaint_report'.$date.'.'.$type, Excel::CSV);
        }elseif($type == 'pdf'){
            return (new ComplaintExport)->download('complaint_report'.$date.'.'.$type, Excel::MPDF);
        }
    }

    public function customers(Request $request)
    {
        $type = $request->type;
        $date = Carbon::now()->getTimestamp();

        if($type == 'xlsx'){
            return (new CustomersExport)->download('active_customers_report'.$date.'.'.$type, Excel::XLSX);
        }elseif($type == 'csv'){
            return (new CustomersExport)->download('active_customers_report'.$date.'.'.$type, Excel::CSV);
        }elseif($type == 'pdf'){
            return (new CustomersExport)->download('active_customers_report'.$date.'.'.$type, Excel::MPDF);
        }
    }

    public function delivery(Request $request)
    {
        $type = $request->type;
        $date = Carbon::now()->getTimestamp();

        if($type == 'xlsx'){
            return (new DeliveryExport)->download('delivery_report'.$date.'.'.$type, Excel::XLSX);
        }elseif($type == 'csv'){
            return (new DeliveryExport)->download('delivery_report'.$date.'.'.$type, Excel::CSV);
        }elseif($type == 'pdf'){
            return (new DeliveryExport)->download('delivery_report'.$date.'.'.$type, Excel::MPDF);
        }
    }

    public function discount(Request $request)
    {
        $type = $request->type;
        $date = Carbon::now()->getTimestamp();

        if($type == 'xlsx'){
            return (new DiscountExport)->download('discount_report'.$date.'.'.$type, Excel::XLSX);
        }elseif($type == 'csv'){
            return (new DiscountExport)->download('discount_report'.$date.'.'.$type, Excel::CSV);
        }elseif($type == 'pdf'){
            return (new DiscountExport)->download('discount_report'.$date.'.'.$type, Excel::MPDF);
        }
    }

    public function feedback(Request $request)
    {
        $type = $request->type;
        $date = Carbon::now()->getTimestamp();

        if($type == 'xlsx'){
            return (new FeedbackExport)->download('feedback_report'.$date.'.'.$type, Excel::XLSX);
        }elseif($type == 'csv'){
            return (new FeedbackExport)->download('feedback_report'.$date.'.'.$type, Excel::CSV);
        }elseif($type == 'pdf'){
            return (new FeedbackExport)->download('feedback_report'.$date.'.'.$type, Excel::MPDF);
        }
    }

    public function incedent(Request $request)
    {
        $type = $request->type;
        $date = Carbon::now()->getTimestamp();

        if($type == 'xlsx'){
            return (new IncedentExport)->download('incedent_report'.$date.'.'.$type, Excel::XLSX);
        }elseif($type == 'csv'){
            return (new IncedentExport)->download('incedent_report'.$date.'.'.$type, Excel::CSV);
        }elseif($type == 'pdf'){
            return (new IncedentExport)->download('incedent_report'.$date.'.'.$type, Excel::MPDF);
        }
    }

    public function inventory(Request $request)
    {
        $type = $request->type;
        $date = Carbon::now()->getTimestamp();

        if($type == 'xlsx'){
            return (new InventoryExport)->download('inventory_report'.$date.'.'.$type, Excel::XLSX);
        }elseif($type == 'csv'){
            return (new InventoryExport)->download('inventory_report'.$date.'.'.$type, Excel::CSV);
        }elseif($type == 'pdf'){
            return (new InventoryExport)->download('inventory_report'.$date.'.'.$type, Excel::MPDF);
        }
    }

    public function payroll(Request $request)
    {
        $type = $request->type;
        $date = Carbon::now()->getTimestamp();

        if($type == 'xlsx'){
            return (new PayrollExport)->download('payroll_report'.$date.'.'.$type, Excel::XLSX);
        }elseif($type == 'csv'){
            return (new PayrollExport)->download('payroll_report'.$date.'.'.$type, Excel::CSV);
        }elseif($type == 'pdf'){
            return (new PayrollExport)->download('payroll_report'.$date.'.'.$type, Excel::MPDF);
        }
    }

    public function quality_check(Request $request)
    {
        $type = $request->type;
        $date = Carbon::now()->getTimestamp();

        if($type == 'xlsx'){
            return (new QualityCheckExport)->download('quality_check_report'.$date.'.'.$type, Excel::XLSX);
        }elseif($type == 'csv'){
            return (new QualityCheckExport)->download('quality_check_report'.$date.'.'.$type, Excel::CSV);
        }elseif($type == 'pdf'){
            return (new QualityCheckExport)->download('quality_check_report'.$date.'.'.$type, Excel::MPDF);
        }
    }
}
