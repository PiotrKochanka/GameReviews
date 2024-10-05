import { Button, Container, Row, Col } from 'react-bootstrap';
import './App.css';
import Header from './components/Header/Header';
import Layout from './components/Layout/Layout';
import Searchbar from './components/Header/Searchbar/Searchbar';
import Menu from './components/Header/Menu/Menu';
import Socials from './components/Header/Socials/Socials';
import Baner from './components/Baner/Baner';
import News from './components/News/News';
import Games from './components/Games/Games';
import About from './components/About/About';
import Best from './components/Best/Best';
import Footer from './components/Footer/Footer';
import logo from './assets/images/logo.png';
import RSSFeed from './components/RSSFeed/Rssfeed';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Login from './cms/components/Auth/Login/Login';
import Register from './cms/components/Auth/Register/Register';
import Dashboard from './cms/pages/Dashboard/Dashboard';
import EditGame from './cms/components/Games/EditGame';
import LoginCMS from './cms/pages/LoginCMS';  // Import strony logowania do Admina
import RegisterCMS from './cms/pages/RegisterCMS';
// import AdminDashboard from './pages/AdminDashboard'; // Import dashboardu Admina
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './cms/components/ProtectRoute/ProtectRoute';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from './components/Loader/Loader';
import Info from './components/Info/Info';
// import RSSFeed from './components/RSSFeed';

function App() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/games');
            console.log(response.data); // Sprawdź, czy dane są pobierane
            setGames(response.data);
            setLoading(false); // Zakończ ładowanie po pobraniu danych
        } catch (error) {
            console.error('Błąd podczas pobierania gier:', error);
            setLoading(false); // Zakończ ładowanie w przypadku błędu
        }
    };

    fetchGames();
  }, []);
  
  if (loading) {
    return <Loader />; // Wyświetl loader podczas ładowania
  }

  const logoElement = (
    <a href="#" className="logo">
      <img src={logo} alt="Logo" />
      <span>FAN<span></span><span>Boy</span></span>
    </a>
  );

  let socials = <Socials />;
  let menu = <Menu />;
  
  function score(score){
    return score > 7 ? 'good_rate' : score > 4.5 ? 'mid_rate' : 'bad_rate';
  }

  let layout = {
    header: (
      <Header>
        {logoElement}
        <div>
          {socials}
          <div>
            {menu}
            <Searchbar />
            <a class="user" href="#" alt="Logowanie"><FontAwesomeIcon icon={faUser} /></a>
          </div>
        </div>
      </Header>
    ),
    baner: (
      <Baner />
    ),
    news: (
      <News />
    ),
    games: (
        <Games games={games}/>
    ),
    about: (
      <About onLogo={logoElement}>
      </About>
    ),
    best: (
      <Best games={games}/>
    ),
    rss: (
      <RSSFeed />
    ),
    footer: (
      <Footer onSocial={socials} onMenu={menu}>
          <Info menuId={37} styleClass="footer"/>
      </Footer>
    ),
  };

  return (
    <div className="App">
        <Router> 
            <Routes>
              <Route 
                path="/" 
                element={
                  <div className="App">
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
                      {/* <Register /> */}
                    </Layout>
                  </div>
                } 
              />
              {/*CMS*/}
              <Route path="/admin" element={
                <LoginCMS />
                } />
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
              {/**/}
            </Routes>
        </Router>
    </div>
  );
}

export default App;
