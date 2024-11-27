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
import NewsListSubpage from './components/Subpage/News/NewsListSubpage';
import RssFeedListSubpage from './components/Subpage/RSSFeed/RssFeedListSubpage';
import RssFeedDetail from './components/Subpage/RSSFeed/RssFeedDetail';
import GamesList from './components/Games/GamesList/GamesList';
import useFetchGames from './hooks/useFetchGames';

function App() {
  const { games, loading, error } = useFetchGames();

  
  if (loading) return <Loader />;
  if (error) return <div>Błąd: {error}</div>;

  const logoElement = (
    <div className="logo_container">
    <a href="/" className="logo">
      <img src={logo} alt="Logo" />
      <span>FAN<span></span><span>Boy</span></span>
    </a>
    <a className="user" href="#" alt="Logowanie">
      <FontAwesomeIcon icon={faUser} />
    </a>
    </div>
  );

  const layout = getLayout({ games, logoElement });

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomeLayout layout={layout} />} />
          <Route path="/news" element={<NewsListLayout layout={layout} />} />
          <Route path="/news/:id" element={<NewsLayout layout={layout} />} />
          <Route path="/rss" element={<RssListLayout layout={layout} />} />
          <Route path="/rss/:title" element={<RssDetail layout={layout} />} />
          <Route path="/games" element={<GameList layout={layout} games={games} />} />
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
      <div className="baner_graphic_back"></div> 
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
      <div className="header_subpage">
        {layout.header}
      </div>
      <main>
        <NewsSubpage />
      </main>
      {layout.footer}
    </Layout>
  );
}

//Aktualności Lista Podstrona
function NewsListLayout({ layout }) {
  return (
    <Layout>
      <div className="header_subpage">
        {layout.header}
      </div>
      <div className="baner_graphic_back baner_graphic_back_news baner_graphic_back_subpage"></div> 
      <main>
        <NewsListSubpage />
      </main>
      {layout.footer}
    </Layout>
  );
}

//Rss Lista Podstrona
function RssListLayout({ layout }) {
  return (
    <Layout>
      <div className="header_subpage">
        {layout.header}
      </div>
      <div className="baner_graphic_back baner_graphic_back_news baner_graphic_back_subpage"></div> 
      <main>
        <RssFeedListSubpage />
      </main>
      {layout.footer}
    </Layout>
  );
}

//Rss Podstrona
function RssDetail({ layout }) {
  return (
    <Layout>
      <div className="header_subpage">
        {layout.header}
      </div>
      <main>
        <RssFeedDetail />
      </main>
      {layout.footer}
    </Layout>
  );
}

//Lista gier
function GameList({ layout, games }) {
  return (
    <Layout>
      <div className="header_subpage">
        {layout.header}
      </div>
      <div className="baner_graphic_back baner_graphic_back_games baner_graphic_back_subpage"></div>
      <main>
        <GamesList games={games}/>
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
        <div className="container menu_center">
          {socials}
          <div className="">
            {menu}
            <Searchbar />
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
