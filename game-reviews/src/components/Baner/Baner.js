import styles from './baner.module.css';
import logoGame from '../../assets/images/logo-baner.png';

function Baner(props){
    return(
        <>
        <div className={`${styles.baner} container`}>
            <div className={`${styles.baner_graphic}`}>  
                  
            </div>
            <div className={`${styles.baner_logo}`}>
                <img src={logoGame} alt="Logo game" />
                <span className={`${styles.baner_rate}`}>Już wkrótce</span>
                <button>Sprawdź</button>
            </div>  
        </div>
        </>
    );
}

export default Baner;