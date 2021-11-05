import { useEffect } from 'react';
import apiClient from './common/api';
import './App.css';
import logo from './logo.svg';

function App() {
  useEffect(() => {
    apiClient.get('/');
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload. This is admin app running on Azure. Now
          we have testing!
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
