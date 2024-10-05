import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './games.module.css';
import MyEditor from '../MyEditor/MyEditor';

function EditGame({ gameId, onClose, onUpdate }) {
    const [game, setGame] = useState({
        title: '',
        score: '',
        date: '',
        content: '',
        image: null,
        background_image: null,
        banner_image: null,
    });

    useEffect(() => {
        fetchGameDetails();
    }, []);

    const fetchGameDetails = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/games/${gameId}`);
            setGame(response.data);
        } catch (error) {
            console.error('Error fetching game details:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setGame({ ...game, [name]: value });
    };

    const handleEditorChange = (content) => {
        setGame(prev => ({
            ...prev,
            content: content,
        }));
    }

    const handleFileChange = (e) => {
        const { name } = e.target;
        setGame({ ...game, [name]: e.target.files[0] });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', game.title);
        formData.append('score', game.score);
        formData.append('date', game.date);
        formData.append('content', game.content);
        if (game.image) {
            formData.append('image', game.image);
        }
        if (game.background_image) {
            formData.append('background_image', game.background_image);
        }
        if (game.banner_image) {
            formData.append('banner_image', game.banner_image);
        }

        try {
            await axios.post(`http://127.0.0.1:8000/api/games/${gameId}/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            onUpdate();
        } catch (error) {
            console.error('Error updating game:', error);
        }
    };

    return (
        <div className={`${styles.addgame_container}`}>
            <form onSubmit={handleSave}>
                <div><span>Tytuł</span><input
                    type="text"
                    name="title"
                    value={game.title}
                    onChange={handleChange}
                    placeholder="Title"
                /></div>
                <div><span>Ocena</span><input
                    type="number"
                    name="score"
                    value={game.score}
                    onChange={handleChange}
                    placeholder="Score"
                /></div>
                <div><span>Data</span><input
                    type="date"
                    name="date"
                    value={game.date}
                    onChange={handleChange}
                /></div>
                <div>
                    <span>Grafika</span>
                    <label>
                        {game.image && (
                            <img
                                src={`http://127.0.0.1:8000/storage/${game.image}`}
                                alt="Current"
                                className={styles.previewImage}
                            />
                        )}
                        <input type="file" name="image" onChange={handleFileChange} />
                    </label>
                </div>
                <div>
                    <span>Tło</span>
                    <label>
                        {game.background_image && (
                            <img
                                src={`http://127.0.0.1:8000/storage/${game.background_image}`}
                                alt="Current Background"
                                className={styles.previewImage}
                            />
                        )}
                        <input type="file" name="background_image" onChange={handleFileChange} />
                    </label>
                </div>
                <div>
                    <span>Baner</span>
                    <label>
                        {game.banner_image && (
                            <img
                                src={`http://127.0.0.1:8000/storage/${game.banner_image}`}
                                alt="Current Banner"
                                className={styles.previewImage}
                            />
                        )}
                        <input type="file" name="banner_image" onChange={handleFileChange} />
                    </label>
                </div>
                <div>
                    <MyEditor value={game.content} onChange={handleEditorChange} />
                </div>
                <button className={`${styles.addgame_add}`} type="submit">Save</button>
                <button className={`${styles.addgame_back}`} type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
}

export default EditGame;
