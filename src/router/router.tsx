import { createBrowserRouter } from 'react-router-dom';

import Login from '@components/pages/login/Login.tsx';
import Signup from '@components/pages/signup/Signup.tsx';
import UserProfile from '@components/pages/profile/UserProfile';
import Home from '@components/pages/home/Home';
import Layout from '@layouts/Layout';

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
        path: "/profile",
        element: <UserProfile />
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