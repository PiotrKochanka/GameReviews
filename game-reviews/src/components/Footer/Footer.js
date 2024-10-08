import styles from './footer.module.css';
import './footer.module.css';

function Footer(props){
    return(
        <footer>
            <div className={`${styles.footer_top} container`}>
                <div className={`${styles.column}`}>
                    {props.children}
                </div>
                <div className={`${styles.column}`}>
                    <h3 className="footer_title">Social media</h3>
                    {props.onSocial}
                </div>
                <div className={`${styles.column}`}>
                    <h3 className="footer_title">Na skróty</h3>
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