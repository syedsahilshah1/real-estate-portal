<?php

namespace App\Http\Controllers;

use App\Models\Inquiry;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class InquiryController extends Controller
{
    /**
     * Display a listing of all inquiries (Admin only).
     */
    public function index(Request $request)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized admin action'], 403);
        }

        return response()->json(Inquiry::orderBy('id', 'desc')->get());
    }

    /**
     * Store a newly created inquiry in storage (Public).
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string',
            'message' => 'required|string',
            'project_id' => 'nullable|exists:projects,id'
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], 422);
        }

        $inquiry = Inquiry::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'message' => $request->message,
            'project_id' => $request->project_id,
            'status' => 'new' // Defaults to new
        ]);

        return response()->json($inquiry, 201);
    }

    /**
     * Update the status of an inquiry (Admin only).
     */
    public function update(Request $request, $id)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized admin action'], 403);
        }

        $validator = Validator::make($request->all(), [
            'status' => 'required|in:new,replied,closed'
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], 422);
        }

        $inquiry = Inquiry::find($id);

        if (!$inquiry) {
            return response()->json(['message' => 'Inquiry record not found'], 404);
        }

        $inquiry->update(['status' => $request->status]);

        return response()->json($inquiry);
    }
}
