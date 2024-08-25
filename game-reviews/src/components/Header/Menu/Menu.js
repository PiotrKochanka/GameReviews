import styles from './menu.module.css';

function Menu(props){
    return(
        <ul className={`${styles.mainMenu}`}>
            <li><a href="#">Test</a></li>
            <li><a href="#">Test2</a></li>
            <li><a href="#">Test3</a></li>
            <li><a href="#">Test4</a></li>
            <li><a href="#">Test5</a></li>
            <li><a href="#">Test6</a></li>
        </ul>
    );
}

export default Menu;