import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditNews from './EditNews'; // Zaimportuj komponent do edycji gier
import AddNews from './AddNews'; // Zaimportuj nowy komponent do dodawania gier
import styles from './news.module.css'; // Importuj CSS, jeśli potrzebujesz
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faNewspaper } from '@fortawesome/free-solid-svg-icons';

function News() {
    const [news, setNews] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [adding, setAdding] = useState(false);
    const [selectedNews, setSelectedNews] = useState(null);

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/news');
            setNews(response.data);
        } catch (error) {
            console.error('Error fetching News:', error);
        }
    };

    const handleEdit = (id) => {
        setEditingId(id);
        const newsToEdit = news.find(news => news.id === id);
        setSelectedNews(newsToEdit);
    };

    const handleDeleteNewsItem = (itemId) => {
        axios.delete(`http://localhost:8000/api/news/${itemId}`)
          .then(() => {
            fetchNews(); // Odświeżenie danych po usunięciu elementu
          })
          .catch(error => {
            console.error('Błąd podczas usuwania elementu:', error);
          });
    };

    const handleCloseEdit = () => {
        setEditingId(null);
        setSelectedNews(null);
    };

    const handleUpdate = () => {
        fetchNews(); // Odśwież dane po zapisaniu
        handleCloseEdit();
    };

    const handleAdd = () => {
        setAdding(true);
    };

    const handleCloseAdd = () => {
        setAdding(false);
    };

    const handleNewsAdded = () => {
        fetchNews(); // Odśwież dane po dodaniu
        handleCloseAdd();
    };

    return (
        <div className={`${styles.newsContainer}`}>
            <h2><FontAwesomeIcon icon={faNewspaper} />Lista Aktualności</h2>
            <ul>
                {news.map(news => (
                    <li key={news.id} className={styles.newsItem}>
                        {news.photo && (
                            <img
                                src={`http://127.0.0.1:8000/storage/${news.photo}`}
                                alt={news.title}
                                className={styles.newsPhoto}
                            />
                        )}
                        <div className={`${styles.newsContainer_data}`}>
                            <span>{news.date}</span>
                            <h3>{news.title}</h3>
                            <p>{news.shortcut}</p>
                        </div>
                        <div className={`${styles.newsContainer_buttons}`}>
                            <button onClick={() => handleEdit(news.id)}><FontAwesomeIcon icon={faPenToSquare} /></button>
                            <button onClick={() => handleDeleteNewsItem(news.id)}><FontAwesomeIcon icon={faTrash} /></button>
                        </div>
                        {editingId === news.id && selectedNews && (
                            <div className={styles.editContainer}>
                                <EditNews
                                    newsId={selectedNews.id}
                                    onClose={handleCloseEdit}
                                    onUpdate={handleUpdate}
                                />
                            </div>
                        )}
                    </li>
                ))}
            </ul>
            <button onClick={handleAdd}>Dodaj Grę</button>
            {adding && (
                <AddNews
                    onClose={handleCloseAdd}
                    onAdd={handleNewsAdded}
                />
            )}
        </div>
    );
}

export default News;
