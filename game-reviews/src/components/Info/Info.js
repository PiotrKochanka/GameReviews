import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './info.css';

function Info({menuId, styleClass}) {
    const [menu, setMenu] = useState([]);

    useEffect(() => {
        fetchMenu();
    }, []);

    const fetchMenu = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/menu?type=menu'); // Wybór typu 'menu' lub 'menu_positions'
            console.log('Menu API Response:', response.data);
            setMenu(response.data);
        } catch (error) {
            console.error('Error fetching Menu:', error);
        }
    };

    const displayMenuItemsById = (menuId) => {
        // funkcja która wyświetla element o danym id z bazy
        const filteredItems = menu.filter(item => item.id === menuId);
        return filteredItems.map(item => (
            <div className={styleClass} key={item.id}>
                <h3 className={`${styleClass}_title`}>{item.name}</h3>
                <p className={`${styleClass}_content`}>{removeHTMLTags(item.content)}</p>
            </div>
        ));
    };

    const removeHTMLTags = (html) => {
        // Funkcja usuwająca znaczniki HTML
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    };

    return (
        <div>
            {displayMenuItemsById(menuId)}
        </div>
    );
}

export default Info;
