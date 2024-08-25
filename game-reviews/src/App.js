import { Button, Container, Row, Col } from 'react-bootstrap';
import './App.css';
import Header from './components/Header/Header';
import Layout from './components/Layout/Layout';
import Searchbar from './components/Header/Searchbar/Searchbar';

function App() {

  let layout = {
    header: (
      <Header>
        <h2>Test</h2>
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
