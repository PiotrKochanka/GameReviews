import styles from './best.module.css';
import Slider from 'react-slick';
import React from 'react';
import PropTypes from 'prop-types';

function Best({ games }) {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 2,
        nextArrow: <div className={`${styles.arrowRight}`}>&#10095;</div>,
        prevArrow: <div className={`${styles.arrowLeft}`}>&#10094;</div>,
    };

    const baseUrl = 'http://127.0.0.1:8000/storage/';

    const filteredGames = games.filter(item => item.score >= 8);

    return (
        <div className={`${styles.bests_container}`}>
            <h2 className={`${styles.title} start-title container`}>Najlepiej oceniane</h2>
            <section className={`container`}>
                <Slider {...settings}>
                    {filteredGames.map((item) => (
                        <article className={`${styles.best}`} key={item.id}>
                            <div className={`${styles.best_icon_cont}`}>
                                <div className={`${styles.best_icon}`}>
                                    <img src={`${baseUrl}${item.image}`} alt={item.title} />
                                </div>
                            </div>
                            <div className={`${styles.best_content}`}>
                                <h2 className={`${styles.best_content_title}`}>{item.title}</h2>
                                <p className={`${
                                    item.score > 7
                                        ? 'good_rate'
                                        : item.score > 4.5 ? 'mid_rate'
                                        : 'bad_rate'
                                    } ${styles.best_content_rate}`}>
                                    {parseFloat(item.score).toFixed(1)}
                                </p>
                            </div>
                        </article>
                    ))}
                </Slider>
            </section>
        </div>
    );
}

// Define PropTypes for the component
Best.propTypes = {
    games: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        score: PropTypes.number.isRequired,
    })).isRequired,
};

export default Best;
