import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from './components/Loader/Loader';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Layout from './components/Layout/Layout';
import Games from './components/Games/Games';
import News from './components/News/News';
import Best from './components/Best/Best';
import About from './components/About/About';
import Baner from './components/Baner/Baner';
import RSSFeed from './components/RSSFeed/Rssfeed';
import LoginCMS from './cms/pages/LoginCMS';
import Dashboard from './cms/pages/Dashboard/Dashboard';
import ProtectedRoute from './cms/components/ProtectRoute/ProtectRoute';
import EditGame from './cms/components/Games/EditGame';
import Socials from './components/Header/Socials/Socials';
import Menu from './components/Header/Menu/Menu';
import Searchbar from './components/Header/Searchbar/Searchbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Info from './components/Info/Info';
import logo from './assets/images/logo.png';
import NewsSubpage from './components/Subpage/News/NewsSubpage';

function App() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/games');
        setGames(response.data);
      } catch (error) {
        console.error('Błąd podczas pobierania gier:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  if (loading) {
    return <Loader />;
  }

  const logoElement = (
    <a href="/" className="logo">
      <img src={logo} alt="Logo" />
      <span>FAN<span></span><span>Boy</span></span>
    </a>
  );

  const layout = getLayout({ games, logoElement });

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomeLayout layout={layout} />} />
          <Route path="/news/:id" element={<NewsLayout layout={layout} />} />
          <Route path="/admin" element={<LoginCMS />} />
          <Route path="/admin/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/dashboard/games/:id" element={
            <ProtectedRoute>
              <EditGame />
            </ProtectedRoute>
          } />
          {/* Trasa ogólna dla nieznalezionych stron */}
          <Route path="*" element={<div>Nie znaleziono strony</div>} />
        </Routes>
      </Router>
    </div>
  );
}

// Funkcja dla pełnego układu na stronie głównej
function HomeLayout({ layout }) {
  return (
    <Layout>
      {layout.header}
      {layout.baner}
      <main>
        {layout.best}
        {layout.games}
        {layout.rss}
        {layout.about}
        {layout.news}
      </main>
      {layout.footer}
    </Layout>
  );
}

// Aktualności Podstrona
function NewsLayout({ layout }) {
  return (
    <Layout>
      {layout.header}
      <main>
        <NewsSubpage />
      </main>
      {layout.footer}
    </Layout>
  );
}

function getLayout({ games, logoElement }) {
  const socials = <Socials />;
  const menu = <Menu />;

  return {
    header: (
      <Header>
        {logoElement}
        <div>
          {socials}
          <div>
            {menu}
            <Searchbar />
            <a className="user" href="#" alt="Logowanie">
              <FontAwesomeIcon icon={faUser} />
            </a>
          </div>
        </div>
      </Header>
    ),
    baner: <Baner />,
    news: <News />,
    games: <Games games={games} />,
    about: <About onLogo={logoElement} />,
    best: <Best games={games} />,
    rss: <RSSFeed />,
    footer: (
      <Footer onSocial={socials} onMenu={menu}>
        <Info menuId={37} styleClass="footer" />
      </Footer>
    ),
  };
}

export default App;
