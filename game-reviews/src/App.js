import { Button, Container, Row, Col } from 'react-bootstrap';
import './App.css';
import Header from './components/Header/Header';
import Layout from './components/Layout/Layout';
import Searchbar from './components/Header/Searchbar/Searchbar';
import logo from './assets/images/logo.png';

function App() {
  let layout = {
    header: (
      <Header>
        <a href="#" className="logo"><img src={logo} alt="Logo"/></a>
        <Searchbar />
      </Header>
    ),
  };

  return (
    <div className="App">
      <Layout>
        {layout.header}
      </Layout>
    </div>
  );
}

export default App;
