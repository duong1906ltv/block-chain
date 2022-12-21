import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function SharedLayout() {
  return (
    <div>
      <Navbar />
      <div>
        <div className="layout">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default SharedLayout;
