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
import logo from './assets/images/logo.png';

function App() {
  let layout = {
    header: (
      <Header>
        <a href="#" className="logo">
          <img src={logo} alt="Logo"/>
        </a>
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
      <About />
    ),
  };

  return (
    <div className="App">
      <Layout>
        {layout.header}
        {layout.baner}
        {layout.games}
        {layout.about}
        {layout.news}
      </Layout>
    </div>
  );
}

export default App;
