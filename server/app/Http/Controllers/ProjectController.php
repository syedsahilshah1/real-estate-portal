<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;

class ProjectController extends Controller
{
    /**
     * Display a listing of projects.
     */
    public function index(Request $request)
    {
        $query = Project::query();

        // Optional search filter
        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        // Optional type filter
        if ($request->has('type')) {
            $query->where('type', $request->input('type'));
        }

        // Optional location filter
        if ($request->has('location')) {
            $query->where('location', 'like', "%{$request->input('location')}%");
        }

        return response()->json($query->orderBy('name')->get());
    }

    /**
     * Store a newly created project.
     */
    public function store(Request $request)
    {
        // Admin authorization check
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized admin action'], 403);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'location' => 'required|string',
            'total_area' => 'required|string',
            'type' => 'required|string',
            'image' => 'required|string',
            'status' => 'string'
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], 422);
        }

        $slug = Str::slug($request->name);
        
        // Ensure slug is unique
        $originalSlug = $slug;
        $count = 1;
        while (Project::where('slug', $slug)->exists()) {
            $slug = $originalSlug . '-' . $count++;
        }

        // Seed some mock gallery elements based on main image
        $gallery = [
            $request->image,
            'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80'
        ];

        $project = Project::create([
            'name' => $request->name,
            'slug' => $slug,
            'description' => $request->description,
            'location' => $request->location,
            'total_area' => $request->total_area,
            'type' => $request->type,
            'image' => $request->image,
            'gallery' => $gallery,
            'brochure' => '/brochures/generic.pdf',
            'status' => $request->status ?? 'Active Development'
        ]);

        return response()->json($project, 201);
    }

    /**
     * Display the specified project.
     */
    public function show($slug)
    {
        $project = Project::with('plots')->where('slug', $slug)->first();

        if (!$project) {
            return response()->json(['message' => 'Project not found'], 404);
        }

        return response()->json($project);
    }

    /**
     * Update the specified project.
     */
    public function update(Request $request, $id)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized admin action'], 403);
        }

        $project = Project::find($id);

        if (!$project) {
            return response()->json(['message' => 'Project not found'], 404);
        }

        $project->update($request->all());

        return response()->json($project);
    }

    /**
     * Remove the specified project from storage.
     */
    public function destroy(Request $request, $id)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized admin action'], 403);
        }

        $project = Project::find($id);

        if (!$project) {
            return response()->json(['message' => 'Project not found'], 404);
        }

        $project->delete();

        return response()->json(['message' => 'Project deleted successfully']);
    }
}
