import useAuth from "@hooks/useAuth";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoutes: React.FC = () => {
    const { isAuth } = useAuth()

    return isAuth ? <Outlet /> : <Navigate to="/" />;
  };