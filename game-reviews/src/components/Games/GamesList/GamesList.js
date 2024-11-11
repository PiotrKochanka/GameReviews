import styles from './gameslist.module.css';
import React, { useState } from 'react';

function GamesList({ games }) {
    const [filter, setFilter] = useState('all');
    const baseUrl = 'http://127.0.0.1:8000/storage/';

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    // Filtruj gry na podstawie wybranego filtra
    const filteredGames = games.filter((item) => {
        if (filter === 'all') return true;
        if (filter === 'best') return item.score > 7;
        if (filter === 'worst') return item.score <= 4.5;
        return false;
    });

    return (
        <div className={`${styles.games_container} container`}>
            <div className={`${styles.games_filter} ${styles.games_column1}`}>
                <h2 className={`${styles.title} start-title container`}>Filtry</h2>
                <div className={`${styles.filters}`}>
                    <ul>
                        <li>
                            <input
                                type="radio"
                                name="filter"
                                value="all"
                                id="all"
                                checked={filter === 'all'}
                                onChange={handleFilterChange}
                            />
                            <label htmlFor="all">Wszystkie</label>
                        </li>
                        <li>
                            <input
                                type="radio"
                                name="filter"
                                value="best"
                                id="best"
                                checked={filter === 'best'}
                                onChange={handleFilterChange}
                            />
                            <label htmlFor="best">Najwyżej oceniane</label>
                        </li>
                        <li>
                            <input
                                type="radio"
                                name="filter"
                                value="worst"
                                id="worst"
                                checked={filter === 'worst'}
                                onChange={handleFilterChange}
                            />
                            <label htmlFor="worst">Najniżej oceniane</label>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={`${styles.games_column2}`}>
                <h2 className={`${styles.title} start-title container`}>Lista gier</h2>
                <div className={`${styles.games}`}>
                    {filteredGames.map((item) => (
                        <div key={item.id} className={`${styles.games_element}`}>
                            <div className={`${styles.games_icon}`}>
                                <img src={`${baseUrl}${item.image}`} alt={item.title} />
                            </div>
                            <div>
                                <span className={`${styles.games_date}`}>
                                    {item.date}
                                </span>
                                <div className={`${styles.games_revtit}`}>
                                    <p
                                        className={`${
                                            item.score > 7
                                                ? 'good_rate'
                                                : item.score > 4.5
                                                ? 'mid_rate'
                                                : 'bad_rate'
                                        } ${styles.best_content_rate}`}
                                    >
                                        {parseFloat(item.score).toFixed(1)}
                                    </p>
                                    <span className={`${styles.games_title}`}>
                                        {item.title}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className={`${styles.games_button_container}`}>
                        <a href="#" className={`${styles.games_button}`}>Zobacz więcej</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GamesList;
