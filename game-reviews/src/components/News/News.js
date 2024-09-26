import styles from './News.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function News(props){
    const [news, setNews] = useState([]);

    useEffect(() => {
        // Funkcja do pobierania danych z API
        const fetchNews = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/news');
                setNews(response.data);
            } catch (error) {
                console.error('Błąd podczas pobierania aktualności:', error);
            }
        };

        fetchNews();
    }, []);

    const baseUrl = 'http://127.0.0.1:8000/storage/';

    return(
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
                        <span className={`${styles.news_content_date}`}><FontAwesomeIcon icon={faCalendar} />{new Date(item.date).toLocaleDateString()}</span>
                        <h2 className={`${styles.news_content_title}`}>{item.title}</h2>
                        <p className={`${styles.news_content_shortcut}`}>{item.shortcut}</p>
                    </div>
                </article>
                ))}
            </section>
        </div>
    );
}

export default News;