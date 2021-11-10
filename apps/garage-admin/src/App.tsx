import { createGlobalStyle } from 'styled-components';
import RouterRoot from './RouterRoot';
import 'antd/dist/antd.css';
import AdminContextProvider from './components/admin/Common/AdminContext';

const GlobalStyles = createGlobalStyle`
  #root {
    height: 100%;
    --primaryNokiaColor: #124191;
    --primaryColor: #1890ff;
    --highlightColor: #e6f7ffa6;
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
