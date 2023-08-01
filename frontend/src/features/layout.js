import React from "react";
import DashBoard from "./dashBoard";
import { Outlet } from "react-router-dom";
import NavBar from "./navBar";

const Layout = () => {
  return (
    <>
      <div className="grid-container">
        <div className="grid-left">
          <NavBar />
          <DashBoard />
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
