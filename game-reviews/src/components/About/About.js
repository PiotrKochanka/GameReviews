import styles from './about.module.css';
import logo from '../../assets/images/logo.png';
import background from '../../assets/images/AdobeStock_426429129.jpeg';
import Info from '../Info/Info';

function About(props){
    return(
        <div className={`${styles.about_container}`}>
            <img src={background} alt="background" />
            <div className={`${styles.about} container`}>
                <div className={`${styles.about_column}`}>
                    {/* <div className="logo logo-about"><img src={logo} alt="Logo" class="logo-start"/><span>Casual<span></span><span>Review</span></span></div> */}
                    {props.onLogo}
                    <Info menuId={35} styleClass="about"/>
                </div>
                <div className={`${styles.about_column}`}>
                    <div className={`${styles.about_ratio}`}>
                        <div>
                            <Info menuId={36} styleClass="about_rev"/>
                        </div>
                        <div>
                            <div className={`${styles.about_ratio_green}`}></div>
                            <div className={`${styles.about_ratio_orange}`}></div>
                            <div className={`${styles.about_ratio_red}`}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;