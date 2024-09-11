<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RSSFeedController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\GameController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/rss-feed', [RSSFeedController::class, 'getFeed']);

Route::get('/users', [UserController::class, 'index']);

Route::get('news', [NewsController::class, 'index']);
Route::get('news/{id}', [NewsController::class, 'show']);
Route::post('news', [NewsController::class, 'store']);
Route::put('news/{id}', [NewsController::class, 'update']);
Route::delete('news/{id}', [NewsController::class, 'destroy']);

Route::get('/games', [GameController::class, 'index']);
Route::get('/games/{id}', [GameController::class, 'show']);
Route::post('/games', [GameController::class, 'store']);
Route::post('/games/{id}/update', [GameController::class, 'update']);
Route::delete('/games/{id}', [GameController::class, 'destroy']);