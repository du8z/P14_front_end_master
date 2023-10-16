import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Home from './pages/CreateEmployee/CreateEmployee';
import EmployeeList from './pages/EmployeeList/EmployeeList';
import store from './Redux/store';
import { Provider } from 'react-redux';

const root = createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <Home />
  </Provider>
);

reportWebVitals();

