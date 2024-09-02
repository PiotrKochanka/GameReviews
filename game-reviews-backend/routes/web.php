<?php

use App\Http\Controllers\RSSFeedController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

// Nowa trasa do pobierania RSS
Route::get('/rss-feed', [RSSFeedController::class, 'getFeed']);

// Dołącz inne pliki z trasami, jeśli istnieją
require __DIR__.'/auth.php';
