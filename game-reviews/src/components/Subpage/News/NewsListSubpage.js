import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import styles from './newssubpage.module.css';

function NewsListSubpage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Ilość aktualności na stronę

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/news');
        // Sortowanie po dacie malejąco
        const sortedNews = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setNews(sortedNews);
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

  // Obliczanie indeksów dla bieżącej strony
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = news.slice(indexOfFirstItem, indexOfLastItem);

  // Obliczanie liczby stron
  const totalPages = Math.ceil(news.length / itemsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={`${styles.news_container} container`}>
      <h2 className={`${styles.title} start-title container`}>Aktualności</h2>
      <section className={`${styles.news} container`}>
        {currentItems.map((item) => (
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

      {/* Lista stron i nawigacja */}
      <div className={`${styles.pagination}`}>
        <button 
          onClick={goToPreviousPage} 
          disabled={currentPage === 1}
        >
          &laquo;
        </button>

        {[...Array(totalPages).keys()].map((pageNumber) => (
          <button
            key={pageNumber + 1}
            onClick={() => handlePageClick(pageNumber + 1)}
            className={currentPage === pageNumber + 1 ? styles.active : ''}
          >
            {pageNumber + 1}
          </button>
        ))}

        <button 
          onClick={goToNextPage} 
          disabled={currentPage === totalPages}
        >
          &raquo;
        </button>
      </div>

      <div className={`${styles.news_button}`}>
        <Link to={`/`}>
          Powrót
        </Link>
      </div>
    </div>
  );
}

export default NewsListSubpage;
