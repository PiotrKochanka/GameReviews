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
import logo from './assets/images/logo.png';
import RSSFeed from './components/RSSFeed/Rssfeed';
// import RSSFeed from './components/RSSFeed';

function App() {
  const logoElement = (
    <a href="#" className="logo">
      <img src={logo} alt="Logo" />
      <span>Casual<span></span><span>Review</span></span>
    </a>
  );

  let layout = {
    header: (
      <Header>
        {logoElement}
        <div>
          <Socials />
          <div>
            <Menu />
            <Searchbar />
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
  };

  return (
    <div className="App">
        <Layout>
          {layout.header}
          {layout.baner}
          <main>
            {layout.best}
            {layout.games}
            {layout.about}
            {layout.news}
            {layout.rss}
          </main>
        </Layout>
    </div>
  );
}

export default App;
