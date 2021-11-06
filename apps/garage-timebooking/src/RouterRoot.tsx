import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CurrentBookings from './components/CurrentBookings';
import History from './components/History';
import NewBooking from './components/NewBooking';

import Login from './pages/Login';
import Root from './pages/Root';

function RouterRoot() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route path="/new" element={<NewBooking />} />
          <Route path="/current" element={<CurrentBookings />} />
          <Route path="/history" element={<History />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
export default RouterRoot;
