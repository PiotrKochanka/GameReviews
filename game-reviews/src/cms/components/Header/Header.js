import styles from './header.module.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Header(props){
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/user', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}` // Zakładając, że używasz tokenów do autoryzacji
                    }
                });
                setUserName(response.data.name); // Zakładam, że zwracana jest struktura { name: 'Piotr Kochanka' }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    return(
        <header className={`${styles.header}`}>
            <ul>
                <li><a href="/" target="_blank" alt="odnośnik do strony głównej">Przejdź do strony</a></li>
                <li><a href="/" alt="odnośnik do strony głównej">Logi</a></li>
                <li><a href="/" alt="odnośnik do strony głównej">Dziennik zmian</a></li>
                <li><a href="/" alt="odnośnik do strony głównej">core</a></li>
                <li><a href="/" alt="odnośnik do strony głównej">Zapytanie SQL</a></li>
            </ul>
            <a href="#" alt="User">{userName || '...'}</a>
        </header>
    );
}

export default Header;