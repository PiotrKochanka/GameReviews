<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\News;
use Illuminate\Support\Facades\Storage;

class NewsController extends Controller
{
    public function index()
    {
        $news = News::all();
        return response()->json($news);
    }

    public function show($id)
    {
        $news = News::find($id);
        if (!$news) {
            return response()->json(['message' => 'Not Found'], 404);
        }
        return response()->json($news);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'date' => 'required|date',
            'content' => 'required|string',
            'shortcut' => 'nullable|string|max:255',
        ]);

        if ($request->hasFile('photo')) {
            $photoPath = $request->file('photo')->store('images', 'public');
            $validatedData['photo'] = $photoPath;
        }

        $news = News::create($validatedData);
        return response()->json($news, 201);
    }

    public function update(Request $request, $id)
    {
        $news = News::find($id);
        if (!$news) {
            return response()->json(['message' => 'Not Found'], 404);
        }
    
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'date' => 'required|date',
            'content' => 'required|string',
            'shortcut' => 'nullable|string|max:255',
        ]);
    
        if ($request->hasFile('photo')) {
            if ($news->photo) {
                Storage::disk('public')->delete($news->photo);
            }
            $photoPath = $request->file('photo')->store('images', 'public');
            $validatedData['photo'] = $photoPath;
        }
    
        $news->update($validatedData);
        return response()->json($news);
    }
}
