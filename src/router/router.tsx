import { createBrowserRouter } from 'react-router-dom';

import Login from '@components/pages/login/Login.tsx';
import Signup from '@components/pages/signup/Signup.tsx';
import Home from '@components/pages/home/Home';
import Layout from '@layouts/Layout';
import { PrivateRoutes } from '@utils/privateRoutes';
import AccountSettings from '@components/pages/account-settings/AccountSettings';
import UserAccount from '@components/pages/account/UserAccount';

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
            path: "/account",
            element: <UserAccount />,
         },
         {
          path: "/account/settings",
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