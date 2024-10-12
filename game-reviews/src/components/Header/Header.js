import styles from './header.module.css';
import React, { useEffect, useState } from 'react';

function Header(props){
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if(window.scrollY > 0) {
                setIsSticky(true)
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return() => {
            window.removeEventListener('scroll', handleScroll);
        }
    });

    return(
        <div className={`${styles.header_back}`}>
            <header className={`${styles.header} ${isSticky ? styles.sticky : ''}`}>
                <div className={`${styles.header_container}`}>
                    {props.children}
                </div>
            </header>
        </div>
    );
}

export default Header;