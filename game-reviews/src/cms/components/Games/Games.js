import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditGame from './EditGame'; // Zaimportuj komponent do edycji gier
import AddGame from './AddGame'; // Zaimportuj nowy komponent do dodawania gier
import styles from './games.module.css'; // Importuj CSS, jeśli potrzebujesz
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

function Games() {
    const [games, setGames] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [adding, setAdding] = useState(false);
    const [selectedGame, setSelectedGame] = useState(null);

    useEffect(() => {
        fetchGames();
    }, []);

    const fetchGames = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/games');
            setGames(response.data);
        } catch (error) {
            console.error('Error fetching games:', error);
        }
    };

    const handleEdit = (id) => {
        setEditingId(id);
        const gameToEdit = games.find(game => game.id === id);
        setSelectedGame(gameToEdit);
    };

    const handleCloseEdit = () => {
        setEditingId(null);
        setSelectedGame(null);
    };

    const handleUpdate = () => {
        fetchGames(); // Odśwież dane po zapisaniu
        handleCloseEdit();
    };

    const handleAdd = () => {
        setAdding(true);
    };

    const handleCloseAdd = () => {
        setAdding(false);
    };

    const handleGameAdded = () => {
        fetchGames(); // Odśwież dane po dodaniu
        handleCloseAdd();
    };

    return (
        <div className={`${styles.gamesContainer}`}>
            <h2>Lista Gier</h2>
            <ul>
                {games.map(game => (
                    <li key={game.id} className={styles.gameItem}>
                        {game.image && (
                            <img
                                src={`http://127.0.0.1:8000/storage/${game.image}`}
                                alt={game.title}
                                className={styles.gameImage}
                            />
                        )}
                        <div className={`${styles.gamesContainer_data}`}>
                            <span>{game.date}</span>
                            <span>{parseFloat(game.score).toFixed(1)}</span>
                            <h3>{game.title}</h3>
                        </div>
                        <div className={`${styles.gamesContainer_buttons}`}>
                            <button onClick={() => handleEdit(game.id)}><FontAwesomeIcon icon={faPenToSquare} /></button>
                        </div>
                        {editingId === game.id && selectedGame && (
                            <div className={styles.editContainer}>
                                <EditGame
                                    gameId={selectedGame.id}
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
                <AddGame
                    onClose={handleCloseAdd}
                    onAdd={handleGameAdded}
                />
            )}
        </div>
    );
}

export default Games;
