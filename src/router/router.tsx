import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';

import Login from '@components/pages/login/Login.tsx';
import Signup from '@components/pages/signup/Signup.tsx';
import UserProfile from '@components/pages/profile/UserProfile';
import Home from '@components/pages/home/Home';
import Layout from '@layouts/Layout';
import { PrivateRoutes } from '@utils/privateRoutes';
import AccountSettings from '@components/pages/account-settings/AccountSettings';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        element: <PrivateRoutes />,
        children: [
         {
            path: "/profile",
            element: <UserProfile />,
         },
         {
          path: "/profile/settings",
          element: <AccountSettings />,
       }
        ]
      },
      {
        path: "/signup",
        element: <Signup />
      },
      {
        path: "/login",
        element: <Login />
      }
    ],
  },
]);

export default router;