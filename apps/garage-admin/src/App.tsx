import { useEffect } from 'react';
import apiClient from './common/api';
import './App.css';
import UserList from './components/UserList';

function App() {
  useEffect(() => {
    apiClient.get('/');
  }, []);

  return (
    <div className="App">
      <UserList />
    </div>
  );
}

export default App;
