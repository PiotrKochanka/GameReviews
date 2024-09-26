<?php

// app/Http/Controllers/MenuController.php
namespace App\Http\Controllers;

use App\Models\Menu;
use App\Models\MenuPosition;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    public function index()
    {
        $menuPositions = MenuPosition::with('menuItems.children')->get();
        return response()->json($menuPositions);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
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





