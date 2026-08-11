<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'plot_id',
        'booking_date',
        'status',
        'payment_status',
        'installment_plan'
    ];

    protected $casts = [
        'installment_plan' => 'array',
    ];

    /**
     * Relationship: A booking belongs to a registered customer.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relationship: A booking targets a specific property plot.
     */
    public function plot()
    {
        return $this->belongsTo(Plot::class);
    }
}
