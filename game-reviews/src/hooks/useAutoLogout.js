// src/hooks/useAutoLogout.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useAutoLogout = (timeout = 300000) => {
    const navigate = useNavigate();

    useEffect(() => {
        let timer;

        const resetTimer = () => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                // Przekierowanie do strony logowania
                navigate('/admin');
            }, timeout);
        };

        // Nasłuchiwacze zdarzeń na aktywność użytkownika
        window.addEventListener('mousemove', resetTimer);
        window.addEventListener('keypress', resetTimer);

        // Ustaw timer przy pierwszym załadowaniu
        resetTimer();

        // Posprzątanie po komponentach
        return () => {
            clearTimeout(timer);
            window.removeEventListener('mousemove', resetTimer);
            window.removeEventListener('keypress', resetTimer);
        };
    }, [navigate, timeout]);
};

export default useAutoLogout;