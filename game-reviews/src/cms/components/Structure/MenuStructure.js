import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddMenuItem from './AddMenuItem';
import EditElement from './EditElement';
import styles from './structure.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderTree, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

const MenuStructure = () => {
  const [menuData, setMenuData] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null);
  const [dataType, setDataType] = useState('menu_positions'); // Domyślnie 'menu_positions'

  // Funkcja do pobierania danych z API
  const fetchMenuData = () => {
    axios.get(`http://localhost:8000/api/menu?type=${dataType}`)
      .then(response => {
        setMenuData(response.data);
      })
      .catch(error => {
        console.error('Błąd podczas pobierania danych:', error);
      });
  };

  useEffect(() => {
    fetchMenuData();
  }, [dataType]); // Zmiana w dataType powoduje ponowne pobranie danych

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
            <div>
              <span><strong>Data: </strong>{item.date}</span>
              <span><strong>Tytuł: </strong>{item.name}</span>
              <span><strong>Link: </strong>{item.url}</span>
              <span><strong>Typ: </strong>{item.menu_type}</span>
              <div className={`${styles.structureButtons}`}>
                <button onClick={() => setEditingItemId(item.id)}>
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
                <button onClick={() => handleDeleteMenuItem(item.id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>

            {editingItemId === item.id && (
              <EditElement 
                item={item} 
                onEdit={handleEditMenuItem} 
                onCancel={() => setEditingItemId(null)} 
              />
            )}

            {item.children && item.children.length > 0 && renderMenuItems(item.children)}
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
              <div>
                <span><strong>Data: </strong>{item.date}</span>
                <span><strong>Tytuł: </strong>{item.name}</span>
                <span><strong>Link: </strong>{item.url}</span>
                <span><strong>Typ: </strong>{item.menu_type}</span>
                <div className={`${styles.structureButtons}`}>
                  <button onClick={() => setEditingItemId(item.id)}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                  <button onClick={() => handleDeleteMenuItem(item.id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>

              {editingItemId === item.id && (
                <EditElement 
                  item={item} 
                  onEdit={handleEditMenuItem} 
                  onCancel={() => setEditingItemId(null)} 
                />
              )}

              {item.children && item.children.length > 0 && renderMenuItems(item.children)}
            </li>
          ))}
      </ul>
    );
  };

  return (
    <div className={`${styles.structureContainer}`}>
      <h2><FontAwesomeIcon icon={faFolderTree} />Struktura Menu</h2>

      {menuData.map(position => (
        <div key={position.id}>
          <h3 className={`${styles.position_title}`}>{position.name}</h3>
          {position.menu_items && renderTopLevelMenuItems(position.menu_items)}
        </div>
      ))}

      {/* Komponent do dodawania nowych elementów */}
      <AddMenuItem onAddMenuItem={handleAddMenuItem} parentMenuItems={menuData.flatMap(pos => pos.menu_items)} />
    </div>
  );
};

export default MenuStructure;
