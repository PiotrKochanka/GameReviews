import styles from './baner.module.css';

function Baner(props){
    return(
        <div className={`${styles.baner}`}>
            <div className={`${styles.baner_graphic}`}>               
            </div>
        </div>
    );
}

export default Baner;