import { createGlobalStyle } from 'styled-components';
import RouterRoot from './RouterRoot';
import 'antd/dist/antd.css';
import AdminContextProvider from './components/admin/Common/AdminContext';

const GlobalStyles = createGlobalStyle`
  #root {
    height: 100%;
    --primaryColor: #124191;
    --secondaryColor: #E6F7FF;
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
