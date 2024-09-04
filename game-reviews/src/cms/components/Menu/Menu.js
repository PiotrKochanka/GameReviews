import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './menu.module.css';

function Menu({ onMenuClick }){
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token'); // Usunięcie tokena
        navigate('/admin'); // Przekierowanie na stronę logowania
    };

    return(
        <div className={`${styles.menu_container}`}>
            <div>
                <h2>Zarządzanie</h2>
                <ul>
                    <li><a href="#" onClick={handleLogout}>Wylogowanie</a></li>
                    <li><button onClick={() => onMenuClick('users')}>Użytkownicy</button></li>
                    <li><button onClick={() => onMenuClick('permissions')}>Prawa dostępu</button></li>
                    <li><button onClick={() => onMenuClick('test')}>Test</button></li>
                </ul>
            </div>
            <div>
                <h2>Moduły</h2>
                <ul>
                    <li><button onClick={() => onMenuClick('news')}>Aktualności</button></li>
                    <li><button onClick={() => onMenuClick('games')}>Gry</button></li>
                    <li><button onClick={() => onMenuClick('menu')}>Menu</button></li>
                    <li><button onClick={() => onMenuClick('content')}>Treści</button></li>
                </ul>
            </div>
        </div>
    );
}

export default Menu;