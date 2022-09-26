import React from "react";
import logo from "../../../images/logo.png";
import "./Header.scss";

const Header = () => {
  return (
    <div className="page-header">
      <h1 className="hidden">Fergus</h1>
      <div className="page-header-logo">
        <img src={logo} alt="Fergus Logo" />
      </div>
      <div className="page-header-title">Job</div>
    </div>
  );
};

export default Header;
