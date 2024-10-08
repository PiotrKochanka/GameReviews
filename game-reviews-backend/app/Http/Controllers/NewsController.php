<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\News;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class NewsController extends Controller
{
    // Fetch all Newss
    public function index()
    {
        return News::all();
    }

    // Fetch a single News by ID
    public function show($id)
    {
        $news = News::find($id);
        if (!$news) {
            return response()->json(['message' => 'News not found'], 404);
        }
        return response()->json($news);
    }

    // Create a new News
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'nullable|string|max:255',
            'photo' => 'nullable|image',
            'shortcut' => 'nullable|string',
            'content' => 'nullable|string',
            'date' => 'nullable|date',
        ]);

        $news = new News();
        $news->title = $request->input('title');
        
        if ($request->hasFile('photo')) {
            $news->photo = $request->file('photo')->store('images', 'public');
        }

        $news->shortcut = $request->input('shortcut');
        $news->date = $request->input('date');
        $news->content = $request->input('content');
        $news->save();

        return response()->json($news, 201);
    }

    // Update an existing News
    public function update(Request $request, $id)
    {
        $news = News::find($id);  // Znajdujemy rekord gry na podstawie ID
    
        // Upewnij się, że walidujesz dane
        $request->validate([
            'title' => 'nullable|string|max:255',
            'photo' => 'nullable|image',
            'shortcut' => 'nullable|string',
            'content' => 'nullable|string',
            'date' => 'nullable|date',
        ]);
    
        // Jeśli przesłano obrazek, zapisujemy go
        if ($request->hasFile('photo')) {
            $news->photo = $request->file('photo')->store('images', 'public');
        }
    
    
        // Aktualizacja pozostałych pól
        $news->title = $request->input('title');
        $news->shortcut = $request->input('shortcut');
        $news->date = $request->input('date');
        $news->content = $request->input('content');
    
        // Zapisujemy zmiany bezpośrednio w bazie
        $news->save();
    
        return response()->json(['success' => true, 'News' => $news]);
    }
    
    public function destroy($id)
    {
        try {
            $news = News::findOrFail($id); // Upewnij się, że aktualność istnieje
            $news->delete(); // Usuń aktualność
            return response()->json(['message' => 'Aktualność została usunięta'], 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Nie udało się usunąć aktualności: ' . $e->getMessage()], 500);
        }
    }
}
