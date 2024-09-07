import React, { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  console.log(location.pathname);

  if (loading) {
    return (
      <div className="relative h-64">
        <progress className="progress w-56 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></progress>
      </div>
    );
  }

  if (user?.email) {
    return children;
  }

  return <Navigate state={location.pathname} to="/SignIn" replace></Navigate>;
};



export default PrivateRoute;
