<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'location',
        'total_area',
        'type',
        'image',
        'gallery',
        'brochure',
        'status'
    ];

    protected $casts = [
        'gallery' => 'array',
    ];

    /**
     * Relationship: A project contains many plot inventories.
     */
    public function plots()
    {
        return $this->hasMany(Plot::class);
    }

    /**
     * Relationship: A project can receive many inquiries.
     */
    public function inquiries()
    {
        return $this->hasMany(Inquiry::class);
    }
}
