import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
function PrivateRoutes() {
  const { currentUser } = useContext(AuthContext);
  return <>{currentUser ? <Outlet /> : <Navigate to="/login" replace />}</>;
}

export default PrivateRoutes;
