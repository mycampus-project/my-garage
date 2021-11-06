import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Admin from './pages/Admin';

function RouterRoot() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Admin />}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default RouterRoot;
