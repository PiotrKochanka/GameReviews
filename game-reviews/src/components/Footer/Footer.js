import styles from './footer.module.css';

function Footer(props){
    return(
        <footer>
            <div className={`${styles.footer_top} container`}>
                <div className={`${styles.column}`}>
                    {props.children}
                </div>
                <div className={`${styles.column}`}>
                    <h2 className={`${styles.footer_title}`}>Social media</h2>
                    {props.onSocial}
                </div>
                <div className={`${styles.column}`}>
                    <h2 className={`${styles.footer_title}`}>Na skróty</h2>
                    {props.onMenu}
                </div>
            </div>
            <div className={`${styles.footer_bottom}`}>
                @Copyright 2024
            </div>
        </footer>
    );
}

export default Footer;