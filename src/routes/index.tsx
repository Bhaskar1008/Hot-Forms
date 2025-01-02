import React from 'react';
import { Routes, Route, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from '../components/Auth/Login/Login';
import Register from '../components/Auth/Register/Register';
import ForgotPassword from '../components/Auth/ForgotPassword/ForgotPassword';
import UserManagement from '../components/UserManagement/UserManagement';
import { FormBuilder } from '../components/HotFormBuilder';
import { routerConfig } from './config';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />
  },
  {
    path: '/user-management',
    element: <UserManagement />
  },
  {
    path: '/builder',
    element: <FormBuilder />
  }
], routerConfig);

const AppRoutes: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;