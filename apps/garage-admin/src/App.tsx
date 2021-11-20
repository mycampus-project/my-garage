import { createGlobalStyle } from 'styled-components';
import { ConfigProvider } from 'antd';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Schema from 'async-validator';
import RouterRoot from './RouterRoot';
import 'antd/dist/antd.variable.min.css';
import AuthContextProvider from './contexts/AuthContext';

// Removes async validation errors on the console log from form validation of antd
// components https://github.com/yiminghe/async-validator#how-to-avoid-global-warning
Schema.warning = () => {};

const GlobalStyles = createGlobalStyle`
  #root {
    height: 100%;
    --padding-xs: 4px;
    --padding-s: 8px;
    --padding-m: 16px;
    --padding-l: 24px;
    --padding-xl: 32px;
    min-width: 1599px;
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
        <ReactQueryDevtools initialIsOpen={false} />
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;
