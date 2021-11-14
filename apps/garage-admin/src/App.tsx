import { createGlobalStyle } from 'styled-components';
import { QueryClientProvider, QueryClient } from 'react-query';
import RouterRoot from './RouterRoot';
import 'antd/dist/antd.css';

import AuthContextProvider from './contexts/AuthContext';

const GlobalStyles = createGlobalStyle`
  #root {
    height: 100%;
    --primaryNokiaColor: #124191;
    --primaryColor: #1890ff;
    --highlightColor: #e6f7ffa6;
  }
`;

const client = new QueryClient();

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
