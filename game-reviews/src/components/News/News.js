import styles from './News.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

function News(props){
    return(
        <div className={`${styles.news_container} container`}>
            <h2 className={`${styles.title} start-title container`}>Aktualności</h2>
            <section className={`${styles.news} container`}>
                <article className={`${styles.news_article}`}>
                    <div className={`${styles.news_icon_cont}`}>
                        <div className={`${styles.news_icon}`}>
                        </div>
                    </div>
                    <div className={`${styles.news_content}`}>
                        <span className={`${styles.news_content_date}`}><FontAwesomeIcon icon={faCalendar} />2024-08-25</span>
                        <h2 className={`${styles.news_content_title}`}>Tytuł</h2>
                        <p className={`${styles.news_content_shortcut}`}>Skrót...</p>
                    </div>
                </article>
                <article className={`${styles.news_article}`}>
                    <div className={`${styles.news_icon_cont}`}>
                        <div className={`${styles.news_icon}`}>
                        </div>
                    </div>
                    <div className={`${styles.news_content}`}>
                        <span className={`${styles.news_content_date}`}><FontAwesomeIcon icon={faCalendar} />2024-08-25</span>
                        <h2 className={`${styles.news_content_title}`}>Tytuł</h2>
                        <p className={`${styles.news_content_shortcut}`}>Skrót...</p>
                    </div>
                </article>
                <article className={`${styles.news_article}`}>
                    <div className={`${styles.news_icon_cont}`}>
                        <div className={`${styles.news_icon}`}>
                        </div>
                    </div>
                    <div className={`${styles.news_content}`}>
                        <span className={`${styles.news_content_date}`}><FontAwesomeIcon icon={faCalendar} />2024-08-25</span>
                        <h2 className={`${styles.news_content_title}`}>Tytuł</h2>
                        <p className={`${styles.news_content_shortcut}`}>Skrót...</p>
                    </div>
                </article>
            </section>
        </div>
    );
}

export default News;