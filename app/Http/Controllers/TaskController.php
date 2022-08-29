<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;

class TaskController extends Controller
{
       /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tasks = Task::with(['user' => function($q){
            return $q->with('roles');
        }])->orderBy('id', 'DESC')->paginate(20);

        return $tasks;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        
        $user = User::find($request->get('user_id'));

        if($user){
            $task = $user->tasks()->create($request->except('user_id'));

            return $task;
        }

        return response('Employee not found', 400);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Task::find($id);
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
        $task = Task::find($id);

        $task->update($request->except('user_id'));

        return $task;
    }

    public function mark_complete($id)
    {
        $task = Task::find($id);

        $task->update(['is_completed' => true]);

        $task->refresh()->load(['user' => function($q) {
            return $q->with('roles');
        }]);

        return $task;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $task = Task::find($id);

        return $task->delete();
    }
}
