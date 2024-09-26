import React, { useState } from 'react';
import axios from 'axios';
import styles from './news.module.css';
import MyEditor from '../MyEditor/MyEditor';

function AddNews({ onClose, onAdd }) {
    const [formData, setFormData] = useState({
        title: '',
        shortcut: '',
        date: '',
        content: '',
    });

    const [files, setFiles] = useState({
        photo: null, // Zmieniono na photo, aby pasowało do inputu
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setFiles(prev => ({
                ...prev,
                [name]: files[0],
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleEditorChange = (content) => {
        setFormData(prev => ({
            ...prev,
            content: content,
        }));
    };

    const handleSave = async (e) => {
        e.preventDefault(); // Zapobiega domyślnemu działaniu formularza
        const data = new FormData();
    
        // Dodaj wszystkie pola tekstowe
        Object.keys(formData).forEach(key => {
            if (formData[key] !== undefined && formData[key] !== null) {
                data.append(key, formData[key]);
            }
        });
    
        // Dodaj pliki
        Object.keys(files).forEach(key => {
            if (files[key]) {
                data.append(key, files[key]);
            }
        });
    
        try {
            await axios.post('http://localhost:8000/api/news', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            onAdd(); // Odśwież listę newsów
            onClose(); // Zamknij formularz
        } catch (error) {
            console.error('Error adding news:', error);
        }
    };

    return (
        <div className={`${styles.addnews_container}`}>
            <h3>Dodaj News</h3>
            <form onSubmit={handleSave}> {/* Dodajemy form, aby przyciski były typu submit */}
                <div><span>Tytuł</span><input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" /></div>
                <div><span>Grafika</span><input type="file" name="photo" onChange={handleChange} /></div> {/* Zmieniono name na "photo" */}
                <div><span>Data</span><input type="date" name="date" value={formData.date} onChange={handleChange} /></div>
                <div><span>Skrót</span><input type="text" name="shortcut" value={formData.shortcut} onChange={handleChange} placeholder="Shortcut" /></div>
                <div><span>Treść</span>
                    <MyEditor value={formData.content} onChange={handleEditorChange} />
                </div>
                <button className={`${styles.addnews_add}`} type="submit">Zapisz</button> {/* Używamy type="submit" */}
                <button className={`${styles.addnews_back}`} type="button" onClick={onClose}>Anuluj</button> {/* Używamy type="button" */}
            </form>
        </div>
    );
}

export default AddNews;
