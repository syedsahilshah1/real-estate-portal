<?php

namespace App\Http\Controllers;

use App\Models\Plot;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PlotController extends Controller
{
    /**
     * Display a listing of all plots.
     */
    public function index()
    {
        return response()->json(Plot::orderBy('id', 'desc')->get());
    }

    /**
     * Store a newly created plot in inventory.
     */
    public function store(Request $request)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized admin action'], 403);
        }

        $validator = Validator::make($request->all(), [
            'project_id' => 'required|exists:projects,id',
            'size' => 'required|string',
            'type' => 'required|string',
            'price' => 'required|numeric',
            'installment_months' => 'required|integer',
            'down_payment' => 'required|numeric',
            'monthly_installment' => 'required|numeric'
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], 422);
        }

        $plot = Plot::create([
            'project_id' => $request->project_id,
            'size' => $request->size,
            'type' => $request->type,
            'price' => $request->price,
            'installment_months' => $request->installment_months,
            'down_payment' => $request->down_payment,
            'monthly_installment' => $request->monthly_installment,
            'status' => 'available' // Defaults to available on creation
        ]);

        return response()->json($plot, 201);
    }

    /**
     * Remove the specified plot from inventory.
     */
    public function destroy(Request $request, $id)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized admin action'], 403);
        }

        $plot = Plot::find($id);

        if (!$plot) {
            return response()->json(['message' => 'Plot not found'], 404);
        }

        $plot->delete();

        return response()->json(['message' => 'Plot removed from inventory successfully']);
    }
}
