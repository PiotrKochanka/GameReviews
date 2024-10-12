import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './newssubpage.module.css';

function NewsSubpage() {
  const { id } = useParams();
  const [newsItem, setNewsItem] = useState(null);
  const [loading, setLoading] = useState(true); // Dodajemy stan ładowania

  useEffect(() => {
    const fetchNewsItem = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/news/${id}`);
        setNewsItem(response.data);
      } catch (error) {
        console.error('Błąd podczas pobierania aktualności:', error);
      } finally {
        setLoading(false); // Ustawiamy loading na false po zakończeniu ładowania
      }
    };

    fetchNewsItem();
  }, [id]);

  // Sprawdzenie, czy dane są w trakcie ładowania
  if (loading) {
    return <div>Ładowanie...</div>;
  }

  // Sprawdzenie, czy newsItem jest null (co może się zdarzyć, jeśli nie ma takich danych w API)
  if (!newsItem) {
    return <div>Nie znaleziono aktualności.</div>;
  }

  return (
    <div className={`${styles.news_subpage} container`}>
      <h1>{newsItem.title}</h1>
      <div>
        <span>{newsItem.date}</span>
        <div
            dangerouslySetInnerHTML={{ __html: newsItem.content }}
        />
      </div>
    </div>
  );
}

export default NewsSubpage;
