import React, { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import Login from "../pages/Login/Login";
import { useDispatch, useSelector } from "react-redux";
import { IDataTypes } from "../redux/Store";
import { login, logout } from "../redux/reducers/AuthSlice";
import { httpClient } from "../api/HttpClien";
const ProtectedRoutes = () => {
  const token = localStorage.getItem("token")
  const dispatch= useDispatch()
  if(token)
  {
    dispatch(login())
  }


  return  token ? <Outlet /> : <Navigate to={"/login"} />
};

export default ProtectedRoutes;

const useTokenValidation = () => {
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const validateToken = async () => {
    try {
      const response = await httpClient.get("/user/validate");
      console.log("respone =>", response);
      if (response.data.success) {
        setIsValid(true);
        setIsLoading(false);
      } else {
        setIsValid(false);
        setIsLoading(false);
      }
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    validateToken();
  }, [isValid]);

  return { isValid, isLoading, error };
};
