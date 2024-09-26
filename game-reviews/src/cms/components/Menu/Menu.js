import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './menu.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faUser, faFolderTree, faNewspaper, faGamepad } from '@fortawesome/free-solid-svg-icons';

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
                    <li><a href="#" onClick={handleLogout}><FontAwesomeIcon icon={faRightFromBracket} />Wylogowanie</a></li>
                    <li><button onClick={() => onMenuClick('users')}><FontAwesomeIcon icon={faUser} />Użytkownicy</button></li>
                    {/* <li><button onClick={() => onMenuClick('permissions')}>Prawa dostępu</button></li> */}
                    <li><button onClick={() => onMenuClick('struktura')}><FontAwesomeIcon icon={faFolderTree} />Struktura</button></li>
                </ul>
            </div>
            <div>
                <h2>Moduły</h2>
                <ul>
                    <li><button onClick={() => onMenuClick('news')}><FontAwesomeIcon icon={faNewspaper} />Aktualności</button></li>
                    <li><button onClick={() => onMenuClick('games')}><FontAwesomeIcon icon={faGamepad} />Gry</button></li>
                    {/* <li><button onClick={() => onMenuClick('menu')}>Menu</button></li>
                    <li><button onClick={() => onMenuClick('content')}>Treści</button></li> */}
                </ul>
            </div>
        </div>
    );
}

export default Menu;