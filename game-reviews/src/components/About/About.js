import styles from './about.module.css';
import logo from '../../assets/images/logo.png';
import background from '../../assets/images/AdobeStock_426429129.jpeg';

function About(props){
    return(
        <div className={`${styles.about_container}`}>
            <img src={background} alt="background" />
            <div className={`${styles.about} container`}>
                <div className={`${styles.about_column}`}>
                    {/* <div className="logo logo-about"><img src={logo} alt="Logo" class="logo-start"/><span>Casual<span></span><span>Review</span></span></div> */}
                    {props.onLogo}
                    <h3>Kim jesteśmy</h3>
                    <span>
                    Lorem ipsum dolor sit amet, 
                    consectetur adipiscing elit, 
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut 
                    aliquip ex ea commodo consequat. 
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum 
                    dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
                    sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </span>
                </div>
                <div className={`${styles.about_column}`}>
                    <div className={`${styles.about_ratio}`}>
                        <div>
                            <h2 className={`${styles.about_ratio_title}`}>System oceniania</h2>
                            <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
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