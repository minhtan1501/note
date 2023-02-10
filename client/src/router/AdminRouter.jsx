import React from "react";
import { useNavigate, Outlet } from "react-router-dom";

export default function AdminRouter() {
  const navigate = useNavigate();
  if (localStorage.getItem("accessToken")) {
    navigate("/home");
    return;
  }

  return <Outlet/>
}
