import styles from './games.module.css';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faClockRotateLeft, faSquarePollVertical } from '@fortawesome/free-solid-svg-icons';


function Games({ games }){
    const today = new Date().toISOString().split('T')[0];

    const newGames = games
        .filter(game => new Date(game.date) <= new Date(today))
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);

    const featureGames = games
        .filter(game => new Date(game.date) > new Date(today))
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);

    return(
        <div className={`${styles.games_container}`}>
            <div className={`${styles.games} container`}>
                <div className={`${styles.games_column}`}>
                    <h3><FontAwesomeIcon icon={faClock} />Ostatnio wydane</h3>
                    {newGames.map((item) => (
                    <div className={`${styles.games_newest}`}>
                        <div className={`${styles.games_revtit}`}>
                            <span className={`${styles.games_rev} ${
                                    item.score > 7
                                        ? 'good_rate'
                                        : item.score > 4.5 ? 'mid_rate'
                                        : 'bad_rate'
                                    }`}>
                                {parseFloat(item.score).toFixed(1)}
                            </span>
                            <span className={`${styles.games_title}`}>
                                {item.title}
                            </span>
                        </div>
                        <span className={`${styles.games_date}`}>
                            {item.date}
                        </span>
                    </div>
                    ))}
                    <a href="#" className={`${styles.games_button}`}>Zobacz więcej</a>
                </div>
                <div className={`${styles.games_column}`}>
                    <h3><FontAwesomeIcon icon={faClockRotateLeft} />Nadchodzące premiery</h3>
                    {featureGames.map((item) => (
                    <div className={`${styles.games_newest}`}>
                        <div className={`${styles.games_revtit}`}>
                            <span className={`${styles.games_rev} ${
                                    item.score > 7
                                        ? 'good_rate'
                                        : item.score > 4.5 ? 'mid_rate'
                                        : 'bad_rate'
                                    }`}>
                                {parseFloat(item.score).toFixed(1)}
                            </span>
                            <span className={`${styles.games_title}`}>
                                {item.title}
                            </span>
                        </div>
                        <span className={`${styles.games_date}`}>
                            {item.date}
                        </span>
                    </div>
                    ))}
                    <a href="#" className={`${styles.games_button}`}>Zobacz więcej</a>
                </div>
                <div className={`${styles.games_column}`}>
                    <h3><FontAwesomeIcon icon={faSquarePollVertical} />Ostatnie recenzje</h3>
                    <div className={`${styles.games_newest}`}>
                        <div className={`${styles.games_revtit}`}>
                            <span className={`${styles.games_rev} mid_rate`}>
                                4.4
                            </span>
                            <span className={`${styles.games_title}`}>
                                Test
                            </span>
                        </div>
                        <span className={`${styles.games_date}`}>
                            8-06-2024
                        </span>
                    </div>
                    <div className={`${styles.games_newest}`}>
                        <div className={`${styles.games_revtit}`}>
                            <span className={`${styles.games_rev} good_rate`}>
                                4.4
                            </span>
                            <span className={`${styles.games_title}`}>
                                Test
                            </span>
                        </div>
                        <span className={`${styles.games_date}`}>
                            8-06-2024
                        </span>
                    </div>
                    <div className={`${styles.games_newest}`}>
                        <div className={`${styles.games_revtit}`}>
                            <span className={`${styles.games_rev} bad_rate`}>
                                4.4
                            </span>
                            <span className={`${styles.games_title}`}>
                                Test
                            </span>
                        </div>
                        <span className={`${styles.games_date}`}>
                            8-06-2024
                        </span>
                    </div>
                    <div className={`${styles.games_newest}`}>
                        <div className={`${styles.games_revtit}`}>
                            <span className={`${styles.games_rev} bad_rate`}>
                                4.4
                            </span>
                            <span className={`${styles.games_title}`}>
                                Test
                            </span>
                        </div>
                        <span className={`${styles.games_date}`}>
                            8-06-2024
                        </span>
                    </div>
                    <a href="#" className={`${styles.games_button}`}>Zobacz więcej</a>           
                </div>
            </div>
        </div>
    );
}

export default Games;