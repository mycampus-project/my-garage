import './App.css';
import 'antd/dist/antd.css';

import { createGlobalStyle } from 'styled-components';
import { QueryClientProvider, QueryClient } from 'react-query';
import RouterRoot from './RouterRoot';
import AuthContextProvider from './contexts/AuthContext';

const client = new QueryClient();

const GlobalStyles = createGlobalStyle`
  #root {
    height: 100%;
  }
`;

function App() {
  return (
    <QueryClientProvider client={client}>
      <AuthContextProvider>
        <GlobalStyles />
        <RouterRoot />
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;
