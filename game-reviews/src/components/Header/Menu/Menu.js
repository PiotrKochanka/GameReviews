import styles from './menu.module.css';

function Menu(props){
    return(
        <ul className={`${styles.mainMenu}`}>
            <li><a href="#">Aktualności</a></li>
            <li><a href="#">Forum</a></li>
            <li><a href="#">Gry</a></li>
            <li><a href="#">Poradniki</a></li>
            <li><a href="#">Promocje</a></li>
            <li><a href="#">O Nas</a></li>
        </ul>
    );
}

export default Menu;