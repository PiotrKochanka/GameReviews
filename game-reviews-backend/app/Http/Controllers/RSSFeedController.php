<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Feeds;

class RSSFeedController extends Controller
{
    public function getFeed()
    {
        // Pobierz dane z kanału RSS
        $feed = Feeds::make('https://feeds.bbci.co.uk/news/rss.xml');

        // Przetwórz dane do formatu JSON
        $articles = [];
        foreach ($feed->get_items() as $item) {
            $articles[] = [
                'title'       => $item->get_title(),
                'link'        => $item->get_permalink(),
                'pubDate'     => $item->get_date('Y-m-d H:i:s'),
                'description' => $item->get_description(),
                'image'       => $item->get_enclosure() ? $item->get_enclosure()->get_link() : null,
            ];
        }

        return response()->json($articles);
    }
}
