import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchRSS = () => {
    const [articles, setArticles] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchRSSFeeds = async () => {
        try {
          const responses = await Promise.all([
            axios.get('http://localhost:8000/api/rss-feed'),
          ]);
  
          const combinedArticles = responses.flatMap(response => response.data);
          combinedArticles.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
          setArticles(combinedArticles.slice());
        } catch (err) {
          setError('Nie udało się pobrać feedów RSS.');
          console.error('Błąd podczas pobierania danych:', err);
        }
      };
  
      fetchRSSFeeds();
    }, []);

    return {error, articles, loading};
}

export default useFetchRSS;

