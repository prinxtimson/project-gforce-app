<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use Illuminate\Http\Request;

class ReservationsController extends Controller
{
       /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $reservations = Reservation::orderBy('id', 'DESC')->paginate(20);
        return $reservations;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        
        $reservation = Reservation::create($request->except('is_approved'));

        return $reservation;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Reservation::find($id);
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
        $reservation = Reservation::find($id);

        $reservation->update($request->except('is_approved'));

        return $reservation;
    }

    public function cancel($id)
    {
        Reservation::find($id)->delete();

        $reservation = Reservation::withTrashed()->find($id);

        return $reservation;
    }

    public function uncancel($id)
    {
        Reservation::withTrashed()->find($id)->restore();

        $reservation = Reservation::find($id);

        return $reservation;
    }

    public function approve($id)
    {
        $reservation = Reservation::find($id);

        $reservation->update(['is_approved' => true]);

        return $reservation;
    }

    public function unapprove($id)
    {
        $reservation = Reservation::find($id);

        $reservation->update(['is_approved' => false]);

        return $reservation;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $reservation = Reservation::withTrashed()->find($id);

        return $reservation->forceDelete();
    }
}
