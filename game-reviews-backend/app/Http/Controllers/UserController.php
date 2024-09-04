<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function index()
    {
        // Pobierz wszystkich użytkowników
        $users = User::all();
        
        // Zwróć użytkowników jako JSON
        return response()->json($users);
    }
}