import styles from './games.module.css';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faClockRotateLeft, faSquarePollVertical } from '@fortawesome/free-solid-svg-icons';


function Games(props){


    return(
        <div className={`${styles.games_container}`}>
            <div className={`${styles.games} container`}>
                <div className={`${styles.games_column}`}>
                    <h3><FontAwesomeIcon icon={faClock} />Ostatnio wydane</h3>
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
                    <a href="#" className={`${styles.games_button}`}>Zobacz więcej</a>
                </div>
                <div className={`${styles.games_column}`}>
                    <h3><FontAwesomeIcon icon={faClockRotateLeft} />Nadchodzące premiery</h3>
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