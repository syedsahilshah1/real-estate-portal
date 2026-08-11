<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Plot;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BookingController extends Controller
{
    /**
     * Display a listing of bookings.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        // Admin sees all bookings, standard user sees only their own
        if ($user->role === 'admin') {
            return response()->json(Booking::orderBy('id', 'desc')->get());
        }

        return response()->json(Booking::where('user_id', $user->id)->orderBy('id', 'desc')->get());
    }

    /**
     * Store a newly created booking.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'plot_id' => 'required|exists:plots,id'
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], 422);
        }

        $plot = Plot::find($request->plot_id);

        if ($plot->status !== 'available') {
            return response()->json(['message' => 'Plot is already booked or pending approval.'], 400);
        }

        // 1. Update plot status to pending
        $plot->update(['status' => 'pending']);

        // 2. Create the installment plan layout summary
        $installmentPlan = [
            'paid_installments' => 0,
            'total_installments' => $plot->installment_months,
            'amount_paid' => 0
        ];

        // 3. Create booking record
        $booking = Booking::create([
            'user_id' => $request->user()->id,
            'plot_id' => $plot->id,
            'booking_date' => now()->toDateString(),
            'status' => 'pending',
            'payment_status' => 'unpaid',
            'installment_plan' => $installmentPlan
        ]);

        return response()->json($booking, 210);
    }

    /**
     * Update the specified booking status (Admin only).
     */
    public function update(Request $request, $id)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized admin action'], 403);
        }

        $validator = Validator::make($request->all(), [
            'status' => 'required|in:approved,cancelled,pending',
            'payment_status' => 'required|in:unpaid,partial,paid'
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], 422);
        }

        $booking = Booking::find($id);

        if (!$booking) {
            return response()->json(['message' => 'Booking record not found'], 404);
        }

        $plot = Plot::find($booking->plot_id);

        // Update plot status depending on booking approval status
        if ($request->status === 'approved') {
            $plot->update(['status' => 'booked']);
            
            // Adjust payments if down payment is approved
            $plan = $booking->installment_plan;
            if ($plan['amount_paid'] == 0) {
                $plan['amount_paid'] = (double)$plot->down_payment;
                $plan['paid_installments'] = 1;
            }
            $booking->installment_plan = $plan;

        } elseif ($request->status === 'cancelled') {
            $plot->update(['status' => 'available']);
        } else {
            $plot->update(['status' => 'pending']);
        }

        $booking->update([
            'status' => $request->status,
            'payment_status' => $request->payment_status,
            'installment_plan' => $booking->installment_plan
        ]);

        return response()->json($booking);
    }
}
