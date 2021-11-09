import { createGlobalStyle } from 'styled-components';
import RouterRoot from './RouterRoot';
import 'antd/dist/antd.css';
import AdminContextProvider from './components/admin/Common/AdminContext';

const GlobalStyles = createGlobalStyle`
  #root {
    height: 100%;
  }
`;

function App() {
  return (
    <AdminContextProvider>
      <GlobalStyles />
      <RouterRoot />
    </AdminContextProvider>
  );
}

export default App;
