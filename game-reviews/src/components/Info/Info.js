import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './info.css';

function Info({ menuId, styleClass }) {
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
        // Funkcja wyświetlająca element o danym id z bazy
        const filteredItems = menu.filter(item => item.id === menuId);
        return filteredItems.map(item => (
            <div className={styleClass} key={item.id}>
                <h3 className={`${styleClass}_title`}>{item.name}</h3>
                <div
                    className={`${styleClass}_content`}
                    dangerouslySetInnerHTML={{ __html: item.content }} // Renderowanie HTML
                />
            </div>
        ));
    };

    return (
        <div>
            {displayMenuItemsById(menuId)}
        </div>
    );
}

export default Info;
