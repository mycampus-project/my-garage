import { createGlobalStyle } from 'styled-components';

import RouterRoot from './RouterRoot';
import './App.css';
import 'antd/dist/antd.css';

const GlobalStyles = createGlobalStyle`
  #root {
    height: 100%;
  }
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <RouterRoot />
    </>
  );
}

export default App;
