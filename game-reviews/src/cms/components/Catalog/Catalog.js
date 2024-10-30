import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './catalog.module.css';

function Catalog() {
  const [folderName, setFolderName] = useState('');
  const [folders, setFolders] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFolderId, setSelectedFolderId] = useState('');
  const [expandedFolders, setExpandedFolders] = useState([]); // Stan do zarządzania rozwinięciem folderów
  const [files, setFiles] = useState({}); // Przechowywanie plików dla rozwiniętych folderów

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFolderId || !selectedFile) {
      console.error('Folder ID or file is not defined');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('catalog_id', selectedFolderId);

    try {
      const response = await axios.post('http://localhost:8000/api/catalogs/upload-file', formData);
      console.log('File uploaded successfully:', response.data);
      fetchFiles(selectedFolderId); // Odśwież pliki po przesłaniu
    } catch (error) {
      console.error('Error uploading file:', error.response.data);
    }
  };

  const fetchFolders = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/catalogs/folders');
      console.log('Fetched folders:', response.data);
      if (response.data && Array.isArray(response.data.folders)) {
        setFolders(response.data.folders);
      } else {
        console.error('No folders found in response:', response.data);
      }
    } catch (error) {
      console.error('Error fetching folders:', error.response ? error.response.data : error.message);
    }
  };

    const fetchFiles = async (folderId) => {
        console.log(`Fetching files for folder ID: ${folderId}`); // Dodaj logowanie
        try {
            const response = await axios.post('http://localhost:8000/api/catalogs/get-files', {
                catalog_id: folderId,
            });
            console.log(`Fetched files for folder ${folderId}:`, response.data);
            setFiles(prevFiles => ({
                ...prevFiles,
                [folderId]: response.data.files || [], // Przechowuj pliki dla danego folderu
            }));
        } catch (error) {
            console.error('Error fetching files:', error.response ? error.response.data : error.message);
        }
    };

    const toggleFolder = (folderId) => {
        if (folderId) {
            setExpandedFolders(prevExpanded => {
                if (prevExpanded.includes(folderId)) {
                    return prevExpanded.filter(id => id !== folderId); // Zwiń folder
                } else {
                    fetchFiles(folderId); // Pobierz pliki, gdy folder jest rozwijany
                    return [...prevExpanded, folderId]; // Rozwiń folder
                }
            });
        }
    };

  const createFolder = async (folderName) => {
    try {
      const response = await axios.post('http://localhost:8000/api/catalogs/create', {
        name: folderName,
      });
      console.log('Folder created:', response.data);
      await fetchFolders(); // Pobierz foldery po utworzeniu nowego
    } catch (error) {
      console.error('Error creating folder:', error.response ? error.response.data : error.message);
    }
  };

  const handleCreateFolder = (e) => {
    e.preventDefault();
    console.log('Creating folder with name:', folderName);
    createFolder(folderName);
  };

  const handleDeleteFile = async (fileName, folderId) => {
    try {
      await axios.post('http://localhost:8000/api/catalogs/delete-file', {
        file: fileName,
        folder: folders.find(folder => folder.id === folderId).name // Znajdź nazwę folderu na podstawie ID
      });
      console.log('File deleted successfully');
      fetchFiles(folderId); // Odśwież pliki po usunięciu
    } catch (error) {
      console.error('Error deleting file:', error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    fetchFolders(); // Pobierz foldery na początku
  }, []);

  return (
    <div className={styles.catalog}>
      <form onSubmit={handleCreateFolder}>
        <input
          type="text"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          placeholder="Nazwa folderu"
        />
        <button type="submit">Stwórz</button>
      </form>

      <form onSubmit={(e) => { e.preventDefault(); handleUpload(); }}>
        <input type="file" onChange={handleFileChange} />
        <select value={selectedFolderId} onChange={(e) => setSelectedFolderId(e.target.value)}>
          <option value="">Wybierz folder</option>
          {folders.map((folder) => (
            <option key={folder.id} value={folder.id}>{folder.name}</option>
          ))}
        </select>
        <button type="submit" disabled={!selectedFolderId || !selectedFile}>Prześlij plik</button>
      </form>

      <h2>Foldery:</h2>
      <ul>
        {folders.length > 0 ? (
          folders.map((folder) => (
            <li key={folder.id}>
              <span onClick={() => toggleFolder(folder.id)} style={{ cursor: 'pointer' }}>
                {folder.name} {expandedFolders.includes(folder.id) ? '-' : '+'}
              </span>
              {expandedFolders.includes(folder.id) && (
                <ul>
                  {files[folder.id] && files[folder.id].length > 0 ? (
                    files[folder.id].map((file) => (
                      <li key={file.id}>
                        {file.name} 
                        <button onClick={() => handleDeleteFile(file.name, folder.id)}>Usuń</button>
                      </li>
                    ))
                  ) : (
                    <li>Brak plików w tym folderze.</li>
                  )}
                </ul>
              )}
            </li>
          ))
        ) : (
          <li>Brak folderów do wyświetlenia.</li>
        )}
      </ul>
    </div>
  );
}

export default Catalog;
