import styles from './best.module.css';
import React from 'react';
import Slider from 'react-slick';

function Best(props){
    const settings = {
        dots: true,  // Pokazuje kropki na dole
        infinite: true,  // Włącza nieskończone przewijanie
        speed: 500,  // Czas trwania animacji w ms
        slidesToShow: 6,  // Liczba widocznych elementów na raz
        slidesToScroll: 2,  // Liczba elementów do przewinięcia naraz
        nextArrow: <div className={`${styles.arrowRight}`}>&#10095;</div>,  // Niestandardowa strzałka w prawo
        prevArrow: <div className={`${styles.arrowLeft}`}>&#10094;</div>,  // Niestandardowa strzałka w lewo
    };

    return(
        <div className={`${styles.bests_container}`}>
            <h2 className={`${styles.title} start-title container`}>Najlepiej oceniane</h2>
            <section className={`container`}>
                <Slider {...settings}>
                <article className={`${styles.best}`}>
                    <div className={`${styles.best_icon_cont}`}>
                        <div className={`${styles.best_icon}`}>
                        </div>
                    </div>
                    <div className={`${styles.best_content}`}>
                        <h2 className={`${styles.best_content_title}`}>Tytuł</h2>
                        <p className={`${styles.best_content_rate}`}>4.4</p>
                    </div>
                </article>
                <article className={`${styles.best}`}>
                    <div className={`${styles.best_icon_cont}`}>
                        <div className={`${styles.best_icon}`}>
                        </div>
                    </div>
                    <div className={`${styles.best_content}`}>
                        <h2 className={`${styles.best_content_title}`}>Tytuł</h2>
                        <p className={`${styles.best_content_rate}`}>4.4</p>
                    </div>
                </article>
                <article className={`${styles.best}`}>
                    <div className={`${styles.best_icon_cont}`}>
                        <div className={`${styles.best_icon}`}>
                        </div>
                    </div>
                    <div className={`${styles.best_content}`}>
                        <h2 className={`${styles.best_content_title}`}>Tytuł</h2>
                        <p className={`${styles.best_content_rate}`}>4.4</p>
                    </div>
                </article>
                <article className={`${styles.best}`}>
                    <div className={`${styles.best_icon_cont}`}>
                        <div className={`${styles.best_icon}`}>
                        </div>
                    </div>
                    <div className={`${styles.best_content}`}>
                        <h2 className={`${styles.best_content_title}`}>Tytuł</h2>
                        <p className={`${styles.best_content_rate}`}>4.4</p>
                    </div>
                </article>
                <article className={`${styles.best}`}>
                    <div className={`${styles.best_icon_cont}`}>
                        <div className={`${styles.best_icon}`}>
                        </div>
                    </div>
                    <div className={`${styles.best_content}`}>
                        <h2 className={`${styles.best_content_title}`}>Tytuł</h2>
                        <p className={`${styles.best_content_rate}`}>4.4</p>
                    </div>
                </article>
                <article className={`${styles.best}`}>
                    <div className={`${styles.best_icon_cont}`}>
                        <div className={`${styles.best_icon}`}>
                        </div>
                    </div>
                    <div className={`${styles.best_content}`}>
                        <h2 className={`${styles.best_content_title}`}>Tytuł</h2>
                        <p className={`${styles.best_content_rate}`}>4.4</p>
                    </div>
                </article>
                <article className={`${styles.best}`}>
                    <div className={`${styles.best_icon_cont}`}>
                        <div className={`${styles.best_icon}`}>
                        </div>
                    </div>
                    <div className={`${styles.best_content}`}>
                        <h2 className={`${styles.best_content_title}`}>Tytuł</h2>
                        <p className={`${styles.best_content_rate}`}>4.4</p>
                    </div>
                </article>
                <article className={`${styles.best}`}>
                    <div className={`${styles.best_icon_cont}`}>
                        <div className={`${styles.best_icon}`}>
                        </div>
                    </div>
                    <div className={`${styles.best_content}`}>
                        <h2 className={`${styles.best_content_title}`}>Tytuł</h2>
                        <p className={`${styles.best_content_rate}`}>4.4</p>
                    </div>
                </article>
                </Slider>
            </section>
        </div>
    );
}

export default Best;