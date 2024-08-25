import styles from './header.module.css';

function Header(props){
    return(
        <header className={`${styles.header}`}>
            <div className={`${styles.header_container} container`}>
                {props.children}
            </div>
        </header>
    );
}

export default Header;