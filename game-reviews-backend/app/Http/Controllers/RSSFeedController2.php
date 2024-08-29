<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use SimplePie;

class RSSFeedController2 extends Controller
{
    public function getFeed()
    {
        try {
            $feed = new SimplePie();
            $feed->set_cache_location(storage_path('framework/cache'));
            $feed->set_feed_url('https://gamerweb.pl/publicystyka/feed/');
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

            return response()->json($articles);
        } catch (\Exception $e) {
            // Obsłuż wyjątek
            return response()->json(['error' => 'Unable to fetch RSS feed', 'message' => $e->getMessage()], 500);
        }
    }
}