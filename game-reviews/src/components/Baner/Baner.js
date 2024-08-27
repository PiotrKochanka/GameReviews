import styles from './baner.module.css';
import logoGame from '../../assets/images/logo-game.webp';

function Baner(props){
    return(
        <>
        <div className={`${styles.baner} container`}>
            <div className={`${styles.baner_graphic}`}>  
                <div className={`${styles.baner_logo}`}>
                    <img src={logoGame} alt="Logo game" />
                    {/* <button>Sprawdź</button> */}
                </div>    
            </div>
        </div>
        <div className={`${styles.baner_graphic_back}`}>

        </div>
        </>
    );
}

export default Baner;