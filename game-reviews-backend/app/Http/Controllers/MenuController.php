<?php

// app/Http/Controllers/MenuController.php
namespace App\Http\Controllers;

use App\Models\Menu;
use App\Models\MenuPosition;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    // public function index()
    // {
    //     $menuPositions = MenuPosition::with('menuItems.children')->get();
    //     return response()->json($menuPositions);
    // }
    public function index(Request $request)
    {
        // Sprawdź, jaki typ danych chcemy zwrócić
        $type = $request->query('type', 'menu'); // Domyślnie 'menu'
    
        if ($type === 'menu') {
            // Zwróć dane z tabeli 'menu'
            $menuItems = Menu::with('children')->where('parent_id', null)->get(); // Ładowanie elementów bez rodzica (główne menu)
    
            return response()->json($menuItems);
        } elseif ($type === 'menu_positions') {
            // Zwróć dane z tabeli 'menu_positions'
            $menuPositions = MenuPosition::with('menuItems.children')->get();
            return response()->json($menuPositions);
        }
    
        return response()->json(['message' => 'Invalid type specified'], 400);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'date' => 'required|date',
            'position_id' => 'required|exists:menu_positions,id',
            'menu_type' => 'required|in:link,menu,info',
            'content' => 'nullable|string',
            'url' => 'nullable|url',
            'image' => 'nullable|string',
            'parent_id' => 'nullable|exists:menu,id', // Dodaj walidację dla parent_id
        ]);

        $menuItem = Menu::create($data);
        return response()->json($menuItem, 201);
    }

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'name' => 'sometimes|required|string',
            'date' => 'required|date',
            'position_id' => 'sometimes|required|exists:menu_positions,id',
            'menu_type' => 'sometimes|required|in:link,menu,info',
            'content' => 'nullable|string',
            'url' => 'nullable|url',
            'image' => 'nullable|string',
            'parent_id' => 'nullable|exists:menu,id', // Dodaj walidację dla parent_id
        ]);

        $menuItem = Menu::findOrFail($id);
        $menuItem->update($data);
        return response()->json($menuItem);
    }

    public function destroy($id)
    {
        $menuItem = Menu::findOrFail($id);
        $menuItem->delete();
        return response()->json(null, 204);
    }
}





