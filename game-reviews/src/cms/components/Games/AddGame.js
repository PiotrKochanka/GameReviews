import React, { useState } from 'react';
import axios from 'axios';
import styles from './games.module.css';
import MyEditor from '../MyEditor/MyEditor';

function AddGame({ onClose, onAdd }) {
    const [formData, setFormData] = useState({
        title: '',
        score: '',
        date: '',
        content: '',
    });

    const [files, setFiles] = useState({
        image: null,
        background_image: null,
        banner_image: null,
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

    const handleSave = async () => {
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
            await axios.post('http://localhost:8000/api/games', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            onAdd(); // Odśwież listę gier
            onClose(); // Zamknij formularz
        } catch (error) {
            console.error('Error adding game:', error);
        }
    };

    return (
        <div className={`${styles.addgame_container}`}>
            <h3>Dodaj Grę</h3>
            <div><span>Tytuł</span><input type="text" name="title" value={formData.title || ''} onChange={handleChange} placeholder="Title" /></div>
            <div><span>Grafika</span><input type="file" name="image" onChange={handleChange} /></div>
            <div><span>Tło</span><input type="file" name="background_image" onChange={handleChange} /></div>
            <div><span>Baner</span><input type="file" name="banner_image" onChange={handleChange} /></div>
            <div><span>Ocena</span><input type="number" name="score" value={formData.score || ''} onChange={handleChange} placeholder="Score" /></div>
            <div><span>Data</span><input type="date" name="date" value={formData.date || ''} onChange={handleChange} /></div>
            <div>
                <MyEditor value={formData.content} onChange={handleEditorChange} />
            </div>
            <button className={`${styles.addgame_add}`} onClick={handleSave}>Zapisz</button>
            <button className={`${styles.addgame_back}`} onClick={onClose}>Anuluj</button>
        </div>
    );
}

export default AddGame;
