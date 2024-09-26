<?php

namespace App\Http\Controllers;

use App\Models\MenuPosition;
use Illuminate\Http\Request;

class MenuPositionController extends Controller
{
    // Pobierz wszystkie pozycje menu
    public function index()
    {
        $menuPositions = MenuPosition::all();
        return response()->json($menuPositions);
    }

    // Zapisz nową pozycję menu
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $menuPosition = MenuPosition::create($data);
        return response()->json($menuPosition, 201);
    }

    // Zaktualizuj pozycję menu
    public function update(Request $request, $id)
    {
        $menuPosition = MenuPosition::findOrFail($id);

        $data = $request->validate([
            'name' => 'sometimes|required|string|max:255',
        ]);

        $menuPosition->update($data);
        return response()->json($menuPosition);
    }

    // Usuń pozycję menu
    public function destroy($id)
    {
        $menuPosition = MenuPosition::findOrFail($id);
        $menuPosition->delete();
        return response()->json(null, 204);
    }
}
