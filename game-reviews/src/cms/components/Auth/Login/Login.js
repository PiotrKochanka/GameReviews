// src/components/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import styles from './login.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/login', { email, password });
            const { token } = response.data;
            localStorage.setItem('token', token);
            navigate('/admin/dashboard');
        } catch (error) {
            console.error('Błąd logowania:', error);
            if (error.response) {
                console.log('Response data:', error.response.data);
                alert(`Błąd logowania: ${error.response.data.message || 'Sprawdź swoje dane uwierzytelniające i spróbuj ponownie.'}`);
            } else {
                alert('Błąd logowania: Nieoczekiwany błąd.');
            }
        }
    };

    return (
        <div className={`${styles.container_login}`}>
            <div className={`${styles.login}`}>
                <h2><FontAwesomeIcon icon={faUser} />Wprowadź dane użytkownika</h2>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
}

export default Login;