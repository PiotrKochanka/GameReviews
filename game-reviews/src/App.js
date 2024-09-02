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
import Login from './components/Auth/Login/Login';
import Register from './components/Auth/Register/Register';
import LoginCMS from './pages/LoginCMS';  // Import strony logowania do Admina
// import AdminDashboard from './pages/AdminDashboard'; // Import dashboardu Admina
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import RSSFeed from './components/RSSFeed';

function App() {
  const logoElement = (
    <a href="#" className="logo">
      <img src={logo} alt="Logo" />
      <span>FAN<span></span><span>Boy</span></span>
    </a>
  );

  let socials = <Socials />;
  let menu = <Menu />;

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
      <Games />
    ),
    about: (
      <About onLogo={logoElement}/>
    ),
    best: (
      <Best />
    ),
    rss: (
      <RSSFeed />
    ),
    footer: (
      <Footer onSocial={socials} onMenu={menu}/>
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
                    </Layout>
                    <Register />
                  </div>
                } 
              />
              <Route path="/admin" element={
                <div class="cmsLogin">
                <LoginCMS />
                </div>
                } />
              {/* <Route path="/admin/dashboard" element={<AdminDashboard />} /> */}
            </Routes>
        </Router>
    </div>
  );
}

export default App;
