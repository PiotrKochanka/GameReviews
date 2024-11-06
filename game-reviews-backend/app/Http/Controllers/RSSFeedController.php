<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use SimplePie;

class RSSFeedController extends Controller
{
    public function getFeed()
    {
        try {
            $feed = new SimplePie();
            $feed->set_cache_location(storage_path('framework/cache'));
            $feed->set_feed_url('https://www.gry-online.pl/newsroom/news/');
            $feed->init();
            
            if ($feed->error()) {
                return response()->json(['error' => 'Feed error: ' . $feed->error()], 500);
            }
    
            // Przetwórz dane do formatu JSON
            $articles = [];
            foreach ($feed->get_items() as $item) {
                $title = $item->get_title(); // Używamy tytułu z aktualnego artykułu
                $articles[] = [
                    'title'       => $title,
                    'link'        => $item->get_permalink(),
                    'pubDate'     => $item->get_date('Y-m-d'),
                    'description' => $item->get_description(),
                    'image'       => $item->get_enclosure() ? $item->get_enclosure()->get_link() : null,
                    'detailLink'  => route('rss.detail', ['title' => urlencode($title)]), // Generuj link do detali
                ];
            }
    
            return response()->json($articles);
        } catch (\Exception $e) {
            // Obsłuż wyjątek
            return response()->json(['error' => 'Unable to fetch RSS feed', 'message' => $e->getMessage()], 500);
        }
    }
    
    
    public function getFeedDetail($title)
    {
        // Używamy funkcji fetchArticles() do pobrania artykułów z feeda
        $feed = new SimplePie();
        $feed->set_cache_location(storage_path('framework/cache'));
        $feed->set_feed_url('https://www.gry-online.pl/newsroom/news/');
        $feed->init();

        if ($feed->error()) {
            return response()->json(['error' => 'Feed error: ' . $feed->error()], 500);
        }

        // Przetwórz dane do formatu JSON
        $articles = [];
        foreach ($feed->get_items() as $item) {
            $articles[] = [
                'title'       => $item->get_title(),
                'link'        => $item->get_permalink(),
                'pubDate'     => $item->get_date('Y-m-d'),
                'description' => $item->get_description(),
                'image'       => $item->get_enclosure() ? $item->get_enclosure()->get_link() : null,
            ];
        }

        // Znajdź artykuł na podstawie tytułu
        $article = collect($articles)->firstWhere('title', urldecode($title)); // Używamy urldecode, aby odkodować tytuł

        if (!$article) {
            return response()->json(['error' => 'Article not found'], 404);
        }

        return response()->json($article); // Zwróć szczegóły artykułu
    }
}