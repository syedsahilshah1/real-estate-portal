<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Plot extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_id',
        'size',
        'type',
        'price',
        'installment_months',
        'down_payment',
        'monthly_installment',
        'status'
    ];

    /**
     * Relationship: A plot belongs to a parent real estate project.
     */
    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    /**
     * Relationship: A plot can be linked to a booking details record.
     */
    public function booking()
    {
        return $this->hasOne(Booking::class);
    }
}
