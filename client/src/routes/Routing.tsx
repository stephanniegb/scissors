import { Route, Routes } from "react-router-dom";
import { Dashboard, Login, Register } from "../pages";

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default Routing;
