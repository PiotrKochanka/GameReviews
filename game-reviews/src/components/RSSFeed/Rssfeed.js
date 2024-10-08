import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DOMPurify from 'dompurify';
import styles from './rssfeed.module.css';

function RSSFeed() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRSSFeeds = async () => {
      try {
        const responses = await Promise.all([
          axios.get('http://localhost:8000/api/rss-feed'),
          // axios.get('http://localhost:8000/rss-feed2')
        ]);

        // Łączymy wyniki z obu kanałów RSS
        const combinedArticles = responses.flatMap(response => response.data);

        // Sortujemy artykuły po dacie publikacji (najpierw najnowsze)
        combinedArticles.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

        // Ograniczamy liczbę wyświetlanych artykułów do 6
        setArticles(combinedArticles.slice(0, 12));
      } catch (err) {
        setError('Nie udało się pobrać feedów RSS.');
        console.error('Błąd podczas pobierania danych:', err);
      }
    };

    fetchRSSFeeds();
  }, []);

  const extractImageFromDescription = (description) => {
    const doc = new DOMParser().parseFromString(description, 'text/html');
    const img = doc.querySelector('img');
    return img ? img.src : null;
  }

  const extractCompanyFromDescription = (description) => {
    const doc = new DOMParser().parseFromString(description, 'text/html');
    const comp = doc.querySelector('a[href="https://www.gry-online.pl/"]');
    return comp ? comp : null;
  }

  const removeImagesFromDescription = (description) => {
    return description.replace(/<img[^>]*>/g, ''); // Usuwamy wszystkie znaczniki <img>
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
              <h2><a href="#">{article.title}</a></h2>
              <div className={`${styles.rss_element} rss_element`}>
                {extractCompanyFromDescription(article.description) && (
                    <div className={`${styles.rss_company}`}>
                      <a href={extractCompanyFromDescription(article.description)}>GRYOnline.pl</a>
                    </div>
                  )}
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
              </div>
            </li>
          ))
        )}
      </ul>
      <div className={`${styles.rss_button}`}>
        <button>Zobacz więcej</button>
      </div>
    </div>
  );
}

export default RSSFeed;