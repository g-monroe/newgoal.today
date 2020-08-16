<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Goal;
class GoalController extends Controller
{
    public function index()
    {
        return Goal::all();
    }

    public function show($id)
    {
        return Goal::find($id);
    }

    public function today(){
        $date = date('Y-m-d');
        $goal = Goal::whereDate('date', $date)->first();
        return response()->json($goal, 201);
    }

    public function store(Request $request)
    {
        $goal = Goal::create($request->all());
        return response()->json($goal, 201);
    }

    public function update(Request $request, $id)
    {
        $goal = Goal::findOrFail($id);
        $goal->update($request->all());

        return response()->json($goal, 200);
    }

    public function delete(Request $request, $id)
    {
        $goal = Goal::findOrFail($id);
        $goal->delete();

        return response()->json(null, 204);
    }
}
