<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Game;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class GameController extends Controller
{
    // Fetch all games
    public function index()
    {
        return Game::all();
    }

    // Fetch a single game by ID
    public function show($id)
    {
        return Game::findOrFail($id);
    }

    // Create a new game
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'nullable|string|max:255',
            'image' => 'nullable|image',
            'background_image' => 'nullable|image',
            'banner_image' => 'nullable|image',
            'score' => 'nullable|numeric',
            'date' => 'nullable|date',
            'content' => 'nullable|string',
        ]);

        $game = new Game();
        $game->title = $request->input('title');
        
        if ($request->hasFile('image')) {
            $game->image = $request->file('image')->store('images', 'public');
        }
        if ($request->hasFile('background_image')) {
            $game->background_image = $request->file('background_image')->store('images', 'public');
        }
        if ($request->hasFile('banner_image')) {
            $game->banner_image = $request->file('banner_image')->store('images', 'public');
        }

        $game->score = $request->input('score');
        $game->date = $request->input('date');
        $game->content = $request->input('content');
        $game->save();

        return response()->json($game, 201);
    }

    // Update an existing game
    public function update(Request $request, $id)
    {
        $game = Game::find($id);  // Znajdujemy rekord gry na podstawie ID
    
        // Upewnij się, że walidujesz dane
        $request->validate([
            'title' => 'required|max:255',
            'score' => 'required|numeric',
            'date' => 'required|date',
            'content' => 'required|string',
            // Możesz dodać więcej walidacji dla obrazków, jeżeli potrzeba
        ]);
    
        // Jeśli przesłano obrazek, zapisujemy go
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('images', 'public');
            $game->image = $imagePath;
        }
    
        if ($request->hasFile('background_image')) {
            $backgroundImagePath = $request->file('background_image')->store('images', 'public');
            $game->background_image = $backgroundImagePath;
        }
    
        if ($request->hasFile('banner_image')) {
            $bannerImagePath = $request->file('banner_image')->store('images', 'public');
            $game->banner_image = $bannerImagePath;
        }
    
        // Aktualizacja pozostałych pól
        $game->title = $request->input('title');
        $game->score = $request->input('score');
        $game->date = $request->input('date');
        $game->content = $request->input('content');
    
        // Zapisujemy zmiany bezpośrednio w bazie
        $game->save();
    
        return response()->json(['success' => true, 'game' => $game]);
    }
    
}
