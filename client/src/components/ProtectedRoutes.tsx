import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../redux/reducers/AuthSlice";
import { IDataTypes } from "../redux/Store";
import { Navigate, Outlet } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

export const ProtectedRoutes = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const jwtToken = localStorage.getItem("token");
    if (jwtToken) {
      const decodedToken: any = jwtDecode(jwtToken);

      if (decodedToken.exp < Math.floor(Date.now() / 1000)) {
        dispatch(logout());
        setLoading(false);
      } else {
        dispatch(login());
        setLoading(false);
      }
    } else {
      dispatch(logout());
      setLoading(false);
    }
  }, [dispatch]);

  const { auth } = useSelector((item: IDataTypes) => item);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  if (loading) {
    return (
      <div style={{display:"flex",justifyContent:"center"}} >
        <Spin indicator={antIcon} />;
      </div>
    );
  }

  return auth ? <Outlet /> : <Navigate to={"/login"} />;
};
