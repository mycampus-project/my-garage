import './App.css';
import 'antd/dist/antd.css';

import { createGlobalStyle } from 'styled-components';
import { QueryClientProvider, QueryClient } from 'react-query';
import RouterRoot from './RouterRoot';

const client = new QueryClient();

const GlobalStyles = createGlobalStyle`
  #root {
    height: 100%;
  }
`;

function App() {
  return (
    <QueryClientProvider client={client}>
      <GlobalStyles />
      <RouterRoot />
    </QueryClientProvider>
  );
}

export default App;
