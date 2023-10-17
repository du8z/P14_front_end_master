import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Home from './pages/CreateEmployee/CreateEmployee';
import EmployeeList from './pages/EmployeeList/EmployeeList';
import store from './Redux/store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
const root = createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Route pour la page d'accueil */}
        <Route path="/employee-list" element={<Outlet />}>
          <Route index element={<EmployeeList />} /> {/* Route pour la liste des employés */}
        </Route>
        </Routes>
    </Router>
  </Provider>,
);
reportWebVitals();

