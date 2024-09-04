import styles from './footer.module.css';

function Footer(props){
    return(
        <footer className={`${styles.footer}`}>
            <span>CMS - wersja 0.1</span>
        </footer>
    );
}

export default Footer;