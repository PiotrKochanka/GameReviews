import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './news.module.css';

function News() {
    const [news, setNews] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({ title: '', photo: '', date: '', content: '', shortcut: '' });
    const [addData, setAddData] = useState({ title: '', photo: '', date: '', content: '', shortcut: '' });

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/news');
            setNews(response.data);
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    };

    const handleEdit = (item) => {
        setEditingId(item.id);
        setEditData({ ...item });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            await axios.put(`http://localhost:8000/api/news/${editingId}`, editData);
            setEditingId(null);
            fetchNews();
        } catch (error) {
            console.error('Error updating news:', error);
        }
    };

    const handleAddChange = (e) => {
        const { name, value } = e.target;
        setAddData((prev) => ({ ...prev, [name]: value }));
    };

    const handleAdd = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/news', {
                title: addData.title,
                photo: addData.photo,
                date: addData.date,
                content: addData.content,
                shortcut: addData.shortcut
            });
            console.log('News added:', response.data);
            fetchNews(); // Odśwież dane
            setAddData({ title: '', photo: '', date: '', content: '', shortcut: '' }); // Wyczyść dane
        } catch (error) {
            console.error('Error adding news:', error);
        }
    };

    return (
        <div className={`${styles.news_container}`}>
            <h2 className={`${styles.title}`}>Aktualności</h2>
            <section className={`${styles.news}`}>
                <ul>
                    {news.map((item) => (
                        <li key={item.id}>
                            <article className={`${styles.news_article}`}>
                                <h3>{item.title}</h3>
                                <p>{item.shortcut}</p>
                                <button onClick={() => handleEdit(item)}>Edytuj</button>
                                
                                {/* Form for editing */}
                                {editingId === item.id && (
                                    <div className={`${styles.edit_form}`}>
                                        <h3>Edytuj aktualność</h3>
                                        <input
                                            type="text"
                                            name="title"
                                            value={editData.title || ""}
                                            onChange={handleChange}
                                            placeholder="Title"
                                        />
                                        <input
                                            type="text"
                                            name="photo"
                                            value={editData.photo || ""}
                                            onChange={handleChange}
                                            placeholder="Photo URL"
                                        />
                                        <input
                                            type="date"
                                            name="date"
                                            value={editData.date}
                                            onChange={handleChange}
                                            placeholder="Date"
                                        />
                                        <textarea
                                            name="content"
                                            value={editData.content || ""}
                                            onChange={handleChange}
                                            placeholder="Content"
                                        />
                                        <input
                                            type="text"
                                            name="shortcut"
                                            value={editData.shortcut || ""}
                                            onChange={handleChange}
                                            placeholder="Shortcut"
                                        />
                                        <button onClick={handleSave}>Save</button>
                                        <button onClick={() => setEditingId(null)}>Cancel</button>
                                    </div>
                                )}
                            </article>
                        </li>
                    ))}
                </ul>
            </section>

            <div className={`${styles.add_form}`}>
                <h3>Dodaj aktualność</h3>
                <input
                    type="text"
                    name="title"
                    value={addData.title}
                    onChange={handleAddChange}
                    placeholder="Title"
                />
                <input
                    type="text"
                    name="photo"
                    value={addData.photo}
                    onChange={handleAddChange}
                    placeholder="Photo URL"
                />
                <input
                    type="date"
                    name="date"
                    value={addData.date}
                    onChange={handleAddChange}
                    placeholder="Date"
                />
                <textarea
                    name="content"
                    value={addData.content}
                    onChange={handleAddChange}
                    placeholder="Content"
                />
                <input
                    type="text"
                    name="shortcut"
                    value={addData.shortcut}
                    onChange={handleAddChange}
                    placeholder="Shortcut"
                />
                <button onClick={handleAdd}>Dodaj</button>
            </div>
        </div>
    );
}

export default News;