import React, { useEffect, useState } from 'react';
import styles from './menu.module.css'; // Używasz CSS Modules
import axios from 'axios';

function Menu() {
  const [menuItems, setMenuItems] = useState([]); // Stan do przechowywania danych menu
  const [visibleSubmenus, setVisibleSubmenus] = useState({}); // Przechowujemy widoczność submenu

  // Funkcja do pobierania danych z API

  const fetchMenuData = () => {
    axios.get('http://localhost:8000/api/menu?type=menu')
      .then(response => {
        const filteredMenuItems = response.data.filter(item => item.position_id === 1); // Filtrujemy elementy, które mają position_id równy 1
        console.log('Fetched Menu Items:', filteredMenuItems); // Debugowanie
        setMenuItems(filteredMenuItems); // Ustawiamy przefiltrowane elementy w stanie
      })
      .catch(error => {
        console.error('Błąd podczas pobierania danych:', error);
      });
  };

  // Obsługa najechania myszką na <li> z podmenu
  const handleMouseEnter = (id) => {
    setVisibleSubmenus(prevState => ({ ...prevState, [id]: true }));
  };

  const handleMouseLeave = (id) => {
    setVisibleSubmenus(prevState => ({ ...prevState, [id]: false }));
  };

  // Użyj useEffect, aby pobrać dane po załadowaniu komponentu
  useEffect(() => {
    fetchMenuData();
  }, []);

  // Rekurencyjna funkcja do renderowania elementów menu i submenu
  const renderMenuItems = (items) => {
    return (
      <>
        {items.map(item => (
          <li key={item.id}
              onMouseEnter={() => handleMouseEnter(item.id)}
              onMouseLeave={() => handleMouseLeave(item.id)}>
            <a href={item.url || '#'}>{item.name}</a>
            {item.children && item.children.length > 0 && (
              <ul className={visibleSubmenus[item.id] ? styles.visible : styles.hidden}>
                {renderMenuItems(item.children)}
              </ul>
            )}
          </li>
        ))}
      </>
    );
  };

  const renderTopLevelMenuItems = (menuItems) => {
    return (
      <ul className={`${styles.mainMenu}`}>
        {menuItems
          .filter(item => !item.parent_id)
          .map(item => (
            <li key={item.id}
                onMouseEnter={() => handleMouseEnter(item.id)}
                onMouseLeave={() => handleMouseLeave(item.id)}>
              <a href={item.url || '#'}>{item.name}</a>
              {item.children && item.children.length > 0 && (
                <ul className={`${visibleSubmenus[item.id] ? styles.visible : styles.hidden} ${styles.mainMenu_2}`}>
                  {renderMenuItems(item.children)}
                </ul>
              )}
            </li>
          ))}
      </ul>
    );
  };

  return (
    <nav>
      {console.log('Stan menuItems:', menuItems)} {/* Logowanie stanu menuItems */}
      {menuItems.length > 0 ? renderTopLevelMenuItems(menuItems) : <p>Ładowanie menu...</p>}
    </nav>
  );
}

export default Menu;
