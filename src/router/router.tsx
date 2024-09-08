import { createBrowserRouter } from 'react-router-dom';
import React, { Suspense } from 'react';
import Home from '@components/pages/home/Home';
import Layout from '@layouts/Layout';
import PrivateRoutes from '@utils/privateRoutes';
import { Spinner } from '@chakra-ui/react';

const Loading = <Spinner margin={'3.12rem auto 0'} thickness='4px' speed='0.65s' emptyColor='gray.200' color='gray.800' size='xl'/>

const AccountSettings = React.lazy(() => import('@components/pages/account-settings/AccountSettings'))
const UserAccount = React.lazy(() => import('@components/pages/account/UserAccount'))

const Signup = React.lazy(() => import('@components/pages/signup/Signup.tsx'))
const Login = React.lazy(() => import('@components/pages/login/Login.tsx'))

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
            path: "/account/:userId",
            element: <Suspense fallback={Loading}>
                        <UserAccount/>
                     </Suspense>,
         },
         {
          path: "/account/settings",
          element: <Suspense fallback={Loading}>
                      <AccountSettings />
                  </Suspense>,
       }
        ]
      },
      {
        path: "/signup",
        element: <Suspense fallback={Loading}>
                    <Signup/>
                 </Suspense>
      },
      {
        path: "/login",
        element: <Suspense fallback={Loading}>
                    <Login/>
                </Suspense>
      }
    ],
  },
]);

export default router;