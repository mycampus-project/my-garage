import { createGlobalStyle } from 'styled-components';
import { ConfigProvider } from 'antd';
import { QueryClientProvider, QueryClient } from 'react-query';
import RouterRoot from './RouterRoot';
import 'antd/dist/antd.variable.min.css';

import AuthContextProvider from './contexts/AuthContext';

const GlobalStyles = createGlobalStyle`
  #root {
    height: 100%;
    --padding-xs: 4px;
    --padding-s: 8px;
    --padding-m: 16px;
    --padding-l: 24px;
    --padding-xl: 32px;
  }
`;

// Define theme variables for ant-design
ConfigProvider.config({
  theme: {
    primaryColor: '#0065ED',
  },
});

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
