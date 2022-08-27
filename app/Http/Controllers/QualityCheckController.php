<?php

namespace App\Http\Controllers;

use App\Models\QualityCheck;
use Illuminate\Http\Request;

class QualityCheckController extends Controller
{
        /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $quality_checks = QualityCheck::orderBy('id', 'DESC')->paginate(20);
        return $quality_checks;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        
        $quality_check = QualityCheck::create($request->all());

        return $quality_check;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return QualityCheck::find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $quality_check = QualityCheck::find($id);

        $quality_check->update($request->all());

        return $quality_check;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $quality_check = QualityCheck::find($id);

        return $quality_check->delete();
    }
}
