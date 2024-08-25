import styles from './socials.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faYoutube, faTwitch, faXTwitter } from '@fortawesome/free-brands-svg-icons';

function Socials(props){
    return(
        <ul className={`${styles.socials}`}>
            <li>
                <a href="#"><FontAwesomeIcon icon={faFacebook} /></a>
            </li>
            <li>
                <a href="#"><FontAwesomeIcon icon={faInstagram} /></a>
            </li>
            <li>
                <a href="#"><FontAwesomeIcon icon={faYoutube} /></a>
            </li>
            <li>
                <a href="#"><FontAwesomeIcon icon={faTwitch} /></a>
            </li>
            <li>
                <a href="#"><FontAwesomeIcon icon={faXTwitter} /></a>
            </li>
        </ul>
    );
}

export default Socials;
