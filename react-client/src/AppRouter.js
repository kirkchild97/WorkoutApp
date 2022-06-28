import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import Dashboard from "./components/Dashboard";
import NavBar from "./components/NavBar";
import App from './App';

function AppRouter() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='' element={<App/>} >
            <Route path='/dashboard' element={<Dashboard />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default AppRouter;
