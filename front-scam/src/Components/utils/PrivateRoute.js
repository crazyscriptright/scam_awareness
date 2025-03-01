import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = ({ isAuthenticated, userType, requiredType }) => {
  return isAuthenticated && userType === requiredType ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
