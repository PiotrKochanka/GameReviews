import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './structure.module.css'; // Upewnij się, że ścieżka jest poprawna
import MyEditor from '../MyEditor/MyEditor';

const EditElement = ({ item, onEdit, onCancel, parentMenuItems = [] }) => {
  const [formData, setFormData] = useState({
    name: item.name,
    position_id: item.position_id,
    menu_type: item.menu_type,
    content: item.content,
    url: item.url,
    image: item.image,
    parent_id: item.parent_id || '', // Dodaj parent_id do początkowych danych formularza
    date: item.date || '', // Upewnij się, że data jest zainicjowana poprawnie
  });
  const [menuPositions, setMenuPositions] = useState([]);

  useEffect(() => {
    // Pobierz dostępne pozycje menu z backendu
    axios.get('http://localhost:8000/api/menu-positions')
      .then(response => {
        setMenuPositions(response.data);
      })
      .catch(error => {
        console.error('Błąd podczas pobierania pozycji menu:', error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

    // Osobna funkcja do obsługi zmiany treści z edytora
    const handleContentChange = (content) => {
      setFormData({ ...formData, content });
    };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8000/api/menu/${item.id}`, formData)
      .then(response => {
        onEdit(response.data); // Przekaż zaktualizowane dane
      })
      .catch(error => {
        console.error('Błąd podczas edycji elementu:', error);
      });
  };

  // Filtruj parentMenuItems, aby nie zawierały aktualnie edytowanego elementu
  const filteredParentMenuItems = parentMenuItems.filter(parentItem => parentItem.id !== item.id);

  return (
    <div className={`${styles.edit_container}`}>
      <form className={`${styles.addgame_container}`} onSubmit={handleSubmit}>
        <div>
          <label>
            Nazwa:
          </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          
        </div>
        <div>
          <label>Data:</label>
          <input
            type="date"
            name="date"
            value={formData.date || ''} 
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Pozycja:</label>
          <select
            name="position_id"
            value={formData.position_id}
            onChange={handleInputChange}
            required
          >
            <option value="">Wybierz pozycję</option>
            {menuPositions.map(position => (
              <option key={position.id} value={position.id}>
                {position.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Parent ID (jeśli istnieje):</label>
          <select
            name="parent_id"
            value={formData.parent_id || ''}
            onChange={handleInputChange}
          >
            <option value="">Brak</option>
            {filteredParentMenuItems.map(parentItem => (
              <option key={parentItem.id} value={parentItem.id}>
                {parentItem.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>
            Typ menu:
          </label>
            <select
              name="menu_type"
              value={formData.menu_type}
              onChange={handleInputChange}
            >
              <option value="link">Link</option>
              <option value="menu">Menu</option>
              <option value="info">Info</option>
            </select>
          
        </div>
        <div>
          <label>
            URL:
          </label>
            <input
              type="text"
              name="url"
              value={formData.url}
              onChange={handleInputChange}
            />
        </div>
        <div>
          <label>
            Obraz:
          </label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
            />
          
        </div>
        <div>
          {/* <label>
            Zawartość:
          </label> */}
          <MyEditor value={formData.content} onChange={handleContentChange} />
          
        </div>
        <button className={`${styles.addMenu_add}`} type="submit">Zapisz</button>
        <button className={`${styles.addMenu_back}`} type="button" onClick={onCancel}>Anuluj</button>
      </form>
    </div>
  );
};

export default EditElement;
