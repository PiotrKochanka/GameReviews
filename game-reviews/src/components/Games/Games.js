import styles from './games.module.css';
import React from 'react';
import Slider from 'react-slick';

function Games(props){
    const settings = {
        dots: true,  // Pokazuje kropki na dole
        infinite: true,  // Włącza nieskończone przewijanie
        speed: 500,  // Czas trwania animacji w ms
        slidesToShow: 6,  // Liczba widocznych elementów na raz
        slidesToScroll: 2,  // Liczba elementów do przewinięcia naraz
        autoplay: true,
        autoplaySpeed: 3000,
        nextArrow: <div className={`${styles.arrowRight}`}>&#10095;</div>,  // Niestandardowa strzałka w prawo
        prevArrow: <div className={`${styles.arrowLeft}`}>&#10094;</div>,  // Niestandardowa strzałka w lewo
    };

    return(
        <div className={`${styles.games_container}`}>
            <h2 className={`${styles.title} start-title container`}>Najnowsze tytuły</h2>
            <section className={`container`}>
                <Slider {...settings}>
                <article className={`${styles.game}`}>
                    <div className={`${styles.game_icon_cont}`}>
                        <div className={`${styles.game_icon}`}>
                        </div>
                    </div>
                    <div className={`${styles.game_content}`}>
                        <h2 className={`${styles.game_content_title}`}>Tytuł</h2>
                        <p className={`${styles.game_content_rate}`}>4.4</p>
                    </div>
                </article>
                <article className={`${styles.game}`}>
                    <div className={`${styles.game_icon_cont}`}>
                        <div className={`${styles.game_icon}`}>
                        </div>
                    </div>
                    <div className={`${styles.game_content}`}>
                        <h2 className={`${styles.game_content_title}`}>Tytuł</h2>
                        <p className={`${styles.game_content_rate}`}>4.4</p>
                    </div>
                </article>
                <article className={`${styles.game}`}>
                    <div className={`${styles.game_icon_cont}`}>
                        <div className={`${styles.game_icon}`}>
                        </div>
                    </div>
                    <div className={`${styles.game_content}`}>
                        <h2 className={`${styles.game_content_title}`}>Tytuł</h2>
                        <p className={`${styles.game_content_rate}`}>4.4</p>
                    </div>
                </article>
                <article className={`${styles.game}`}>
                    <div className={`${styles.game_icon_cont}`}>
                        <div className={`${styles.game_icon}`}>
                        </div>
                    </div>
                    <div className={`${styles.game_content}`}>
                        <h2 className={`${styles.game_content_title}`}>Tytuł</h2>
                        <p className={`${styles.game_content_rate}`}>4.4</p>
                    </div>
                </article>
                <article className={`${styles.game}`}>
                    <div className={`${styles.game_icon_cont}`}>
                        <div className={`${styles.game_icon}`}>
                        </div>
                    </div>
                    <div className={`${styles.game_content}`}>
                        <h2 className={`${styles.game_content_title}`}>Tytuł</h2>
                        <p className={`${styles.game_content_rate}`}>4.4</p>
                    </div>
                </article>
                <article className={`${styles.game}`}>
                    <div className={`${styles.game_icon_cont}`}>
                        <div className={`${styles.game_icon}`}>
                        </div>
                    </div>
                    <div className={`${styles.game_content}`}>
                        <h2 className={`${styles.game_content_title}`}>Tytuł</h2>
                        <p className={`${styles.game_content_rate}`}>4.4</p>
                    </div>
                </article>
                <article className={`${styles.game}`}>
                    <div className={`${styles.game_icon_cont}`}>
                        <div className={`${styles.game_icon}`}>
                        </div>
                    </div>
                    <div className={`${styles.game_content}`}>
                        <h2 className={`${styles.game_content_title}`}>Tytuł</h2>
                        <p className={`${styles.game_content_rate}`}>4.4</p>
                    </div>
                </article>
                <article className={`${styles.game}`}>
                    <div className={`${styles.game_icon_cont}`}>
                        <div className={`${styles.game_icon}`}>
                        </div>
                    </div>
                    <div className={`${styles.game_content}`}>
                        <h2 className={`${styles.game_content_title}`}>Tytuł</h2>
                        <p className={`${styles.game_content_rate}`}>4.4</p>
                    </div>
                </article>
                </Slider>
            </section>
        </div>
    );
}

export default Games;