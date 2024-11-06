import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './rssfeedlistsubpage.module.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';

function RssFeedDetail() {
  const { title } = useParams(); // Używamy useParams do pobrania tytułu z URL
  const [article, setArticle] = useState(null); // Stan do przechowywania artykułu
  const [loading, setLoading] = useState(true); // Stan do monitorowania ładowania

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/rss/${title}`); // Zakładając, że API zwraca artykuł na podstawie tytułu
        setArticle(response.data);
      } catch (error) {
        console.error('Błąd podczas pobierania artykułu:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [title]);

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

  if (loading) {
    return <div>Loading...</div>; // Wyświetlenie informacji o ładowaniu
  }

  if (!article) {
    return <div>Artykuł nie został znaleziony.</div>; // Obsługa przypadku braku artykułu
  }

  return (       
    <div className="subpage_main_container">
      {extractImageFromDescription(article.description) && (
      <div 
        style={{ backgroundImage: `url(${extractImageFromDescription(article.description)})` }}
        className="baner_graphic_back baner_graphic_back_news baner_graphic_back_subpage">    
      </div>)
      }
      <div className={`${styles.rss_subpage} container`}>
        <div className={`${styles.rss_title_comp}`}>
          <h1 className={`title_subpage`}>{article.title}</h1>
          {extractCompanyFromDescription(article.description) && (
            <div className={`${styles.rss_company} ${styles.rss_company_details}`}>
              <a href={extractCompanyFromDescription(article.description)}>GRYOnline.pl</a>
            </div>
          )}
          <p className={`date_subpage`}><FontAwesomeIcon icon={faClock} />{article.pubDate}</p>
        </div>
        <div 
          className={`${styles.rss_content}`}
          dangerouslySetInnerHTML={{ __html: article.description }}
        />
        <div className={`${styles.rss_button}`}>
            <Link target="_blank" to={`${article.link}`}>
              Czytaj więcej
            </Link>
        </div>
      </div>
    </div>
  );
}

export default RssFeedDetail;
