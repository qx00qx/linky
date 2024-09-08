import useAuth from "@hooks/useAuth";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes: React.FC = () => {
    const { isAuth } = useAuth()

    return isAuth ? <Outlet /> : <Navigate to="/" />;
  };

  export default PrivateRoutes