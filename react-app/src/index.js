import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/CreateEmployee/CreateEmployee';
import EmployeeList from './pages/EmployeeList/EmployeeList';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>,
  },
  {
    path: '/employee-list',
    element: <EmployeeList/>,
  }
])



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router} />

)


reportWebVitals();
