import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogout } from "../store/authSlice";

const Logout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLogout());
  }, []);
  return <Navigate to={"/"} />;
};

export default Logout;
