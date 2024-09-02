import React from 'react';
import Login from '../components/Auth/Login/Login';
import { useNavigate } from 'react-router-dom';
import Register from '../components/Auth/Register/Register';

function LoginCMS() {
  const navigate = useNavigate();

  const handleLogin = (name, password) => {
    // Tutaj powinno znajdować się wywołanie API do sprawdzenia danych logowania
    // Na razie załóżmy, że dane są zawsze poprawne
    if (name === "name" && password === "password") {
      navigate('/admin/dashboard'); // Przekierowanie do dashboardu po zalogowaniu
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div>
      <Login onLogin={handleLogin} />
    </div>
  );
}

export default LoginCMS;