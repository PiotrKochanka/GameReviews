import React, { useEffect, useState } from 'react';
import styles from './logs.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode } from '@fortawesome/free-solid-svg-icons';

function Logs() {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/api/logs')
            .then(response => response.json())
            .then(data => {
                setLogs(data.split('\n').filter(log => log)); // Podziel logi na linie
            });
    }, []);

    return (
        <div className={styles.logsContainer}>
            <h2><FontAwesomeIcon icon={faCode} />Logi zapytań SQL:</h2>
            <ul>
                {logs.map((log, index) => (
                    <li key={index}>{log}</li>
                ))}
            </ul>
        </div>
    );
}

export default Logs;