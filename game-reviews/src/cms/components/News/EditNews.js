import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './news.module.css';
import MyEditor from '../MyEditor/MyEditor';

function EditNews({ newsId, onClose, onUpdate }) {
    const [news, setNews] = useState({
        title: '',
        shortcut: '',
        date: '',
        content: '',
        photo: null,
    });

    useEffect(() => {
        fetchNewsDetails();
    }, []);

    const fetchNewsDetails = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/news/${newsId}`);
            setNews(response.data);
        } catch (error) {
            console.error('Error fetching news details:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNews({ ...news, [name]: value });
    };

    const handleEditorChange = (content) => {
        setNews(prev => ({
            ...prev,
            content: content,
        }));
    }

    const handleFileChange = (e) => {
        const { name } = e.target;
        setNews({ ...news, [name]: e.target.files[0] });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', news.title);
        formData.append('shortcut', news.shortcut);
        formData.append('date', news.date);
        formData.append('content', news.content);
        if (news.photo) {
            formData.append('photo', news.photo);
        }

        try {
            await axios.post(`http://127.0.0.1:8000/api/news/${newsId}/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            onUpdate();
        } catch (error) {
            console.error('Error updating news:', error);
        }
    };

    return (
        <div className={`${styles.addnews_container}`}>
            <form onSubmit={handleSave}>
                <div><span>Tytuł</span><input
                    type="text"
                    name="title"
                    value={news.title}
                    onChange={handleChange}
                    placeholder="Title"
                /></div>
                <div><span>Skrót</span><input
                    type="text"
                    name="shortcut"
                    value={news.shortcut}
                    onChange={handleChange}
                    placeholder="Shortcut"
                /></div>
                <div><span>Data</span><input
                    type="date"
                    name="date"
                    value={news.date}
                    onChange={handleChange}
                /></div>
                <div>
                    <span>Grafika</span>
                    <label>
                        {news.photo && (
                            <img
                                src={`http://127.0.0.1:8000/storage/${news.photo}`}
                                alt="Current"
                                className={styles.previewPhoto}
                            />
                        )}
                        <input type="file" name="photo" onChange={handleFileChange} />
                    </label>
                </div>
                <div><span>Treść</span>
                    <MyEditor value={news.content} onChange={handleEditorChange} />
                </div>
                <button className={`${styles.addnews_add}`} type="submit">Save</button>
                <button className={`${styles.addnews_back}`} type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
}

export default EditNews;
