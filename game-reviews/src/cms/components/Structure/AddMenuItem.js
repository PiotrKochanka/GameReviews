import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './structure.module.css';
import MyEditor from '../MyEditor/MyEditor';

const AddMenuItem = ({ onAddMenuItem, parentMenuItems }) => {
  const [formData, setFormData] = useState({
    name: '',
    position_id: '',
    menu_type: 'link',
    content: '',
    url: '',
    image: '',
    parent_id: null,
    date: '', // Zainicjowane pole daty
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Obsługa zmiany treści w edytorze
  const handleContentChange = (content) => {
    setFormData({
      ...formData,
      content: content // Zaktualizuj pole 'content' oddzielnie
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Sprawdź, czy data jest prawidłowo ustawiona
    console.log("Formularz wysyłany z datą:", formData.date);
  
    // Wyślij dane do backendu
    axios.post('http://localhost:8000/api/menu', formData)
      .then(response => {
        onAddMenuItem(response.data); // Aktualizacja struktury menu
      })
      .catch(error => {
        console.error('Błąd podczas dodawania elementu menu:', error);
      });
  };

  return (
    <form className={`${styles.addgame_container}`} onSubmit={handleSubmit}>
      <div>
        <label>Nazwa:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Data:</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Pozycja:</label>
        <select
          name="position_id"
          value={formData.position_id}
          onChange={handleChange}
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
        <label>Typ menu:</label>
        <select
          name="menu_type"
          value={formData.menu_type}
          onChange={handleChange}
        >
          <option value="link">Link</option>
          <option value="menu">Menu</option>
          <option value="info">Info</option>
        </select>
      </div>
      <div>
        <label>Parent ID (jeśli istnieje):</label>
        <select
          name="parent_id"
          value={formData.parent_id || ''}
          onChange={handleChange}
        >
          <option value="">Brak</option>
          {parentMenuItems.map(item => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>URL:</label>
        <input
          type="text"
          name="url"
          value={formData.url}
          onChange={handleChange}
        />
      </div>
      <div>
        {/* <label>Content:</label> */}
        <MyEditor value={formData.content} onChange={handleContentChange} />
      </div>
      <button className={`${styles.addMenu_add}`} type="submit">Dodaj element</button>
    </form>
  );
};

export default AddMenuItem;
