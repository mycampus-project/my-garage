import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboards from './components/admin/Dashboards';
import Devices from './components/admin/Devices';
import Users from './components/admin/Users';

import Login from './pages/Login';
import Admin from './pages/Admin';

function RouterRoot() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Admin />}>
          <Route path="/devices" element={<Devices />} />
          <Route path="/users" element={<Users />} />
          <Route path="/dashboards" element={<Dashboards />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
export default RouterRoot;
