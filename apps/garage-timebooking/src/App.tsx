import './App.css';
import 'antd/dist/antd.css';

import { createGlobalStyle } from 'styled-components';
import RouterRoot from './RouterRoot';

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
