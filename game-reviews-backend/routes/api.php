<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RSSFeedController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\GameController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\MenuPositionController;
use App\Http\Controllers\CatalogController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/rss-feed', [RSSFeedController::class, 'getFeed']);
Route::get('/rss-feed/{id}', [RSSFeedController::class, 'show']);
Route::get('/rss/{title}', [RSSFeedController::class, 'getFeedDetail'])->name('rss.detail');

Route::get('/users', [UserController::class, 'index']);

Route::get('/news', [NewsController::class, 'index']);
Route::get('/news/{id}', [NewsController::class, 'show']);
Route::post('/news', [NewsController::class, 'store']);
Route::post('/news/{id}/update', [NewsController::class, 'update']);
Route::delete('/news/{id}', [NewsController::class, 'destroy']);

Route::get('/games', [GameController::class, 'index']);
Route::get('/games/{id}', [GameController::class, 'show']);
Route::post('/games', [GameController::class, 'store']);
Route::post('/games/{id}/update', [GameController::class, 'update']);
Route::delete('/games/{id}', [GameController::class, 'destroy']);

Route::get('menu', [MenuController::class, 'index']);
Route::post('menu', [MenuController::class, 'store']);
Route::put('menu/{id}', [MenuController::class, 'update']);
Route::delete('menu/{id}', [MenuController::class, 'destroy']);

Route::get('/menu-positions', [MenuPositionController::class, 'index']);
Route::post('/menu-positions', [MenuPositionController::class, 'store']);
Route::put('/menu-positions/{id}', [MenuPositionController::class, 'update']);
Route::delete('/menu-positions/{id}', [MenuPositionController::class, 'destroy']);

Route::get('/logs', function () {
    $logs = file_get_contents(storage_path('logs/laravel.log'));
    return response()->json($logs);
});

Route::post('/catalogs/create', [CatalogController::class, 'create']);
Route::post('/catalogs/upload-file', [CatalogController::class, 'uploadFile']);
Route::get('/catalogs/folders', [CatalogController::class, 'getFolders']);
Route::post('/catalogs/get-files', [CatalogController::class, 'getFiles']);
Route::post('/catalogs/delete-file', [CatalogController::class, 'deleteFile']);
Route::get('catalogs/get-images', 'CatalogController@getImages');