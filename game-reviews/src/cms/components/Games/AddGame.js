import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './games.module.css';
import MyEditor from '../MyEditor/MyEditor';

function AddGame({ onClose, onAdd }) {
    const [formData, setFormData] = useState({
        title: '',
        score: '',
        date: '',
        content: '',
    });

    const [files, setFiles] = useState([]); // Zmiana na tablicę plików
    const [folders, setFolders] = useState([]); // Katalogi
    const [selectedImage, setSelectedImage] = useState(null); // Wybrany obrazek jako obiekt
    const [selectedFolder, setSelectedFolder] = useState(''); // Wybrany folder

    // Funkcja do pobierania folderów
    const fetchFolders = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/catalogs/folders'); // Zaktualizuj endpoint do pobierania katalogów
            setFolders(response.data.folders);
        } catch (error) {
            console.error('Error fetching folders:', error);
        }
    };

    // Funkcja do pobierania plików z wybranego folderu
    const fetchFiles = async (catalogId) => {
        try {
            const response = await axios.post('http://localhost:8000/api/catalogs/get-files', {
                catalog_id: catalogId
            });
            setFiles(response.data.files); // Ustaw pliki w stanie
        } catch (error) {
            console.error('Error fetching files:', error);
        }
    };

    useEffect(() => {
        fetchFolders(); // Pobierz katalogi po załadowaniu komponentu
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleEditorChange = (content) => {
        setFormData(prev => ({
            ...prev,
            content: content,
        }));
    };

    const handleSave = async () => {
        const data = new FormData();
        
        // Dodaj wszystkie pola tekstowe
        Object.keys(formData).forEach(key => {
            if (formData[key] !== undefined && formData[key] !== null) {
                data.append(key, formData[key]);
            }
        });
    
        // Dodaj wybrany obrazek jako obiekt pliku
        if (selectedImage) {
            try {
                const response = await axios.get(`http://localhost:8000/storage/${selectedImage.path}`, {
                    responseType: 'blob', // Używaj blob, aby uzyskać plik
                });
                const file = new File([response.data], selectedImage.name, { type: response.headers['content-type'] }); // Użyj content-type z odpowiedzi
                data.append('image', file);
            } catch (error) {
                console.error('Error fetching the image:', error);
                return; // Przerwij, jeśli nie uda się pobrać pliku
            }
        }
    
        console.log('Form Data After Append:', data);
    
        try {
            await axios.post('http://localhost:8000/api/games', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            onAdd();
            onClose();
        } catch (error) {
            console.error('Error adding game:', error.response.data);
        }
    };

    const handleFolderChange = async (e) => {
        const catalogId = e.target.value;
        setSelectedFolder(catalogId); // Ustaw wybrany folder

        if (catalogId) {
            await fetchFiles(catalogId); // Pobierz pliki z wybranego katalogu
            setSelectedImage(null); // Zresetuj wybraną grafikę
        }
    };

    const handleFileSelect = (e) => {
        const selectedFileName = e.target.value; // Zmieniono na selectedFileName
        const selectedFile = files.find(file => file.name === selectedFileName); // Użyj name
        
        console.log('Selected File Name:', selectedFileName);
        console.log('Files:', files);
    
        if (selectedFile) {
            setSelectedImage(selectedFile);
            console.log('Selected File:', selectedFile);
        } else {
            console.log('No file found with the given name');
        }
    };

    return (
        <div className={`${styles.addgame_container}`}>
            <h3>Dodaj Grę</h3>
            <div><span>Tytuł</span><input type="text" name="title" value={formData.title || ''} onChange={handleChange} placeholder="Title" /></div>
            <div>
                <span>Wybierz grafikę z katalogu</span>
                <select onChange={handleFolderChange}>
                    <option value="">-- Wybierz katalog --</option>
                    {folders.map(folder => (
                        <option key={folder.id} value={folder.id}>{folder.name}</option>
                    ))}
                </select>
            </div>
            {selectedFolder && (
                <div>
                    <span>Wybierz plik:</span>
                    <select onChange={handleFileSelect}>
                        <option value="">-- Wybierz plik --</option>
                        {files.map(file => (
                            <option key={file.name} value={file.name}>{file.name}</option> // Użyj file.name jako value
                        ))}
                    </select>
                </div>
            )}
            <div>
                <span>Wybrana grafika:</span>
                <input type="text" value={selectedImage ? selectedImage.path : ''} readOnly />
            </div>
            <div><span>Ocena</span><input type="number" name="score" value={formData.score || ''} onChange={handleChange} placeholder="Score" /></div>
            <div><span>Data</span><input type="date" name="date" value={formData.date || ''} onChange={handleChange} /></div>
            <div>
                <MyEditor value={formData.content} onChange={handleEditorChange} />
            </div>
            <button className={`${styles.addgame_add}`} onClick={handleSave}>Zapisz</button>
            <button className={`${styles.addgame_back}`} onClick={onClose}>Anuluj</button>
        </div>
    );
}

export default AddGame;
