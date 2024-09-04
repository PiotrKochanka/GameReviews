<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\News;

class NewsController extends Controller
{
    public function index()
    {
        // Pobierz wszystkie rekordy z tabeli 'news'
        $news = News::all();
        
        // Zwróć rekordy jako JSON
        return response()->json($news);
    }

    public function show($id)
    {
        // Pobierz pojedynczy rekord na podstawie ID
        $news = News::find($id);

        if (!$news) {
            return response()->json(['message' => 'Nie znaleziono'], 404);
        }

        // Zwróć rekord jako JSON
        return response()->json($news);
    }

    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'title' => 'required|string|max:255',
                'photo' => 'nullable|string|max:255',
                'date' => 'required|date',
                'content' => 'required|string',
                'shortcut' => 'nullable|string|max:255',
            ]);
    
            $news = News::create($validatedData);
    
            return response()->json($news, 201);
        } catch (\Exception $e) {
            \Log::error('Error creating news: ' . $e->getMessage());
            return response()->json(['message' => 'Internal Server Error'], 500);
        }
    }

    public function update(Request $request, $id)
    {
        // Pobierz rekord na podstawie ID
        $news = News::find($id);

        if (!$news) {
            return response()->json(['message' => 'Nie znaleziono'], 404);
        }

        // Walidacja danych
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'photo' => 'nullable|string|max:255',
            'date' => 'required|date',
            'content' => 'required|string',
            'shortcut' => 'nullable|string|max:255',
        ]);

        // Aktualizacja rekordu
        $news->update($validatedData);

        // Zwróć zaktualizowany rekord jako JSON
        return response()->json($news);
    }
}