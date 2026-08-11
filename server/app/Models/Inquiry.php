<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inquiry extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'message',
        'project_id',
        'status'
    ];

    /**
     * Relationship: An inquiry can refer to a specific real estate project.
     */
    public function project()
    {
        return $this->belongsTo(Project::class);
    }
}
