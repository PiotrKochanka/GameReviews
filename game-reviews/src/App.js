import { Button, Container, Row, Col } from 'react-bootstrap';
import './App.css';
import Header from './components/Header/Header';
import Layout from './components/Layout/Layout';
import Searchbar from './components/Header/Searchbar/Searchbar';

function App() {
  return (
    <div className="App">
      <Layout
          header = {
            <Header>
              <h2>Test</h2>
              <Searchbar></Searchbar>
            </Header>
          }
      />
    </div>
  );
}

export default App;
