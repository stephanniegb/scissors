import { Route, Routes } from "react-router-dom";
import { Dashboard, Login, Register, UrlShortner } from "../pages";
import AuthProvider from "../context/AuthContext";
import PrivateRoutes from "./PrivateRoutes";

function Routing() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/urlshortner" element={<UrlShortner />} />
        </Route>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </AuthProvider>
  );
}

export default Routing;
