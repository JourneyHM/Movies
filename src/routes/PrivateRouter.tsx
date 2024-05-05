import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";

const PrivateRouter = () => {
  return (
    <div className="bg-gradient-to-r from-gray-950 via-indigo-950 to-gray-950">
        <Header />
        <Outlet />
    </div>
  );
}

export default PrivateRouter;