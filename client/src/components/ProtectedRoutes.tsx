import React, { useState } from "react";
import { Outlet , Navigate} from "react-router-dom";
import Login from "../pages/Login/Login";
const ProtectedRoutes = () => {
  const [auth, setAuth] = useState<boolean>(true);

  return auth ? <Outlet /> : <Navigate to={"/"}  />
};

export default ProtectedRoutes;
