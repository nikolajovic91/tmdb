import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/svg/logo.svg";

const Header = () => {
  return (
    <header className="header">
      <NavLink to="/">
        <img src={logo} alt="logo" />
      </NavLink>
      <nav>
        <NavLink to="/movies" activeClassName="active-link">
          Movies
        </NavLink>
        <NavLink to="/shows" activeClassName="active-link">
          Tv Shows
        </NavLink>
        <NavLink to="/persons" activeClassName="active-link">
          Persons
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
