import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'; // Użyj Link zamiast a
import styles from './News.module.css';

function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/news');
        setNews(response.data);
        setLoading(false);
      } catch (error) {
        setError('Błąd podczas pobierania aktualności');
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const baseUrl = 'http://127.0.0.1:8000/storage/';

  if (loading) {
    return <div>Ładowanie aktualności...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={`${styles.news_container} container`}>
      <h2 className={`${styles.title} start-title container`}>Aktualności</h2>
      <section className={`${styles.news} container`}>
        {news.map((item) => (
          <article key={item.id} className={`${styles.news_article}`}>
            <div className={`${styles.news_icon_cont}`}>
              <div className={`${styles.news_icon}`}>
                <img src={`${baseUrl}${item.photo}`} alt={item.title} />
              </div>
            </div>
            <div className={`${styles.news_content}`}>
              <span className={`${styles.news_content_date}`}>
                <FontAwesomeIcon icon={faCalendar} /> {new Date(item.date).toLocaleDateString()}
              </span>
              <h2 className={`${styles.news_content_title}`}>
                <Link to={`/news/${item.id}`}>
                  {item.title}
                </Link>
              </h2>
              <p className={`${styles.news_content_shortcut}`}>{item.shortcut}</p>
            </div>
          </article>
        ))}
      </section>
      <div className={`${styles.news_button}`}>
        <button>Zobacz więcej</button>
      </div>
    </div>
  );
}

export default News;
