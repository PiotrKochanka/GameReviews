import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DOMPurify from 'dompurify';
import { Link } from 'react-router-dom';
import styles from './rssfeedlistsubpage.module.css';

function RssFeedListSubpage() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

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

  const extractImageFromDescription = (description) => {
    if (!description) return null;
    const doc = new DOMParser().parseFromString(description, 'text/html');
    const img = doc.querySelector('img');
    return img ? img.src : null;
  };

  const removeImagesFromDescription = (description) => {
    return description ? description.replace(/<img[^>]*>/g, '') : '';
  };

  return (
    <div className={`${styles.rss_container_all} container`}>
      {error && <p>{error}</p>}
      <h2 className="start-title container">Aktualności ze świata gier</h2>
      <ul className={`${styles.rss_container}`}>
        {articles.length === 0 ? (
          <p>Brak dostępnych artykułów.</p>
        ) : (
          articles.map((article, index) => (
            <li className={`${styles.rss_li}`} key={index}>
              <p className={`${styles.rss_date}`}><em>{article.pubDate}</em></p>
              <h2>
                <Link to={`/rss/${encodeURIComponent(article.title)}`}>
                  {article.title}
                </Link>
              </h2>
              <div className={`${styles.rss_element} rss_element`}>
                {extractImageFromDescription(article.description) && (
                  <div className={`${styles.rss_image}`}>
                    <img
                      src={extractImageFromDescription(article.description)}
                      alt="Article image"
                      className={styles.articleImage}
                    />
                  </div>
                )}
                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(removeImagesFromDescription(article.description)) }} />
                <div className={`${styles.rss_button}`}>
                  <Link to={`/rss-detail/${encodeURIComponent(article.title)}`}>
                    <button>Zobacz więcej</button>
                  </Link>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
      <div className={`${styles.rss_button}`}>
        <Link to={`/`}>
          <button>Powrót</button>
        </Link>
      </div>
    </div>
  );
}

export default RssFeedListSubpage;
