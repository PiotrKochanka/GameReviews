import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddMenuItem from './AddMenuItem';
import EditElement from './EditElement';
import styles from './structure.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderTree } from '@fortawesome/free-solid-svg-icons';

const MenuStructure = () => {
  const [menuPositions, setMenuPositions] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null);

  // Funkcja do pobierania danych z API
  const fetchMenuData = () => {
    axios.get('http://localhost:8000/api/menu')
      .then(response => {
        setMenuPositions(response.data);
      })
      .catch(error => {
        console.error('Błąd podczas pobierania danych:', error);
      });
  };

  useEffect(() => {
    fetchMenuData();
  }, []);

  const handleAddMenuItem = (newMenuItem) => {
    fetchMenuData(); // Odświeżenie danych po dodaniu nowego elementu
  };

  const handleEditMenuItem = (updatedMenuItem) => {
    fetchMenuData(); // Odświeżenie danych po edycji elementu
    setEditingItemId(null); // Ukryj formularz edycji po zapisaniu
  };

  const handleDeleteMenuItem = (itemId) => {
    axios.delete(`http://localhost:8000/api/menu/${itemId}`)
      .then(() => {
        fetchMenuData(); // Odświeżenie danych po usunięciu elementu
      })
      .catch(error => {
        console.error('Błąd podczas usuwania elementu:', error);
      });
  };

  // Funkcja rekurencyjna do renderowania elementów menu i podmenu
  const renderMenuItems = (menuItems) => {
    return (
      <ul className={`${styles.structureUl_2}`}>
        {menuItems.map(item => (
          <li key={item.id}>
            <span>{item.created_at}</span>
            <span>{item.name}</span>
            <span>{item.url}</span>
            <button onClick={() => setEditingItemId(item.id)}>
              Edytuj
            </button>
            <button onClick={() => handleDeleteMenuItem(item.id)}>
              Usuń
            </button>

            {editingItemId === item.id && (
              <EditElement 
                item={item} 
                onEdit={handleEditMenuItem} 
                onCancel={() => setEditingItemId(null)} 
              />
            )}

            {item.children && item.children.length > 0 && (
              <ul>
                {renderMenuItems(item.children)}
              </ul>
            )}
          </li>
        ))}
      </ul>
    );
  };

  const renderTopLevelMenuItems = (menuItems) => {
    return (
      <ul className={`${styles.structureUl}`}>
        {menuItems
          .filter(item => !item.parent_id)
          .map(item => (
            <li key={item.id}>
              <span>{item.created_at}</span>
              <span>{item.name}</span>
              <span>{item.url}</span>
              <button onClick={() => setEditingItemId(item.id)}>
                Edytuj
              </button>
              <button onClick={() => handleDeleteMenuItem(item.id)}>
                Usuń
              </button>

              {editingItemId === item.id && (
                <EditElement 
                  item={item} 
                  onEdit={handleEditMenuItem} 
                  onCancel={() => setEditingItemId(null)} 
                />
              )}

              {item.children && item.children.length > 0 && (
                <ul>
                  {renderMenuItems(item.children)}
                </ul>
              )}
            </li>
          ))}
      </ul>
    );
  };

  return (
    <div className={`${styles.structureContainer}`}>
      <h2><FontAwesomeIcon icon={faFolderTree} />Struktura Menu</h2>
      {menuPositions.map(position => (
        <div key={position.id}>
          <h3>{position.name}</h3>
          {position.menu_items && renderTopLevelMenuItems(position.menu_items)}
        </div>
      ))}

      {/* Komponent do dodawania nowych elementów */}
      <AddMenuItem onAddMenuItem={handleAddMenuItem} parentMenuItems={menuPositions.flatMap(pos => pos.menu_items)} />
    </div>
  );
};

export default MenuStructure;
