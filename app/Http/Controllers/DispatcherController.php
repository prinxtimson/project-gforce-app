<?php

namespace App\Http\Controllers;

use App\Models\Dispatcher;
use Illuminate\Http\Request;

class DispatcherController extends Controller
{
       /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $dispatchers = Dispatcher::orderBy('id', 'DESC')->paginate(20);
        return $dispatchers;
    }


    public function search($name)
    {
        //$search = collect();
        return Dispatcher::where('name', 'like', '%'.$name.'%')->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'name' => 'required|string',
            'availability' => 'required|string',
            'phone' => 'required|string',
            'status' => 'required|string',
            'description' => 'string',
            'rating' => 'string'
        ]);

        $dispatcher = Dispatcher::create($fields);

        return $dispatcher;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Dispatcher::find($id);
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
        $fields = $request->validate([
            'name' => 'string',
            'availability' => 'string',
            'phone' => 'string',
            'status' => 'string',
            'description' => 'string',
            'rating' => 'string'
        ]);

        $dispatcher = Dispatcher::find($id);

        $dispatcher->update($fields);

        return $dispatcher;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $dispatcher = Dispatcher::find($id);

        return $dispatcher->delete();
    }
}
