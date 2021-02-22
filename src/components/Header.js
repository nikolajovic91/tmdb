import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/svg/logo.svg";
import menu from "../assets/svg/menu.svg";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { CLEAR_SEARCHED_SHOWS } from "../store/types";
const Header = ({ toggleDrawer }) => {
  const [isDesktop, setDesktop] = useState(window.innerWidth > 600);
  const history = useHistory();
  const dispatch = useDispatch();
  const updateMedia = () => {
    setDesktop(window.innerWidth > 600);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });
  return (
    <header className="header">
      <NavLink to="/">
        <img src={logo} alt="logo" />
      </NavLink>
      {isDesktop ? (
        <nav id="nav">
          <div
            onClick={() => {
              history.push({ pathname: `/movies` });
            }}
          >
            Movies
          </div>
          <div
            onClick={() => {
              history.push({ pathname: `/shows` });
              dispatch({ type: CLEAR_SEARCHED_SHOWS });
            }}
          >
            Tv Shows
          </div>
          <div
            onClick={() => {
              history.push({ pathname: `/persons` });
            }}
          >
            Persons
          </div>
          {/* <NavLink to="/movies" activeClassName="active-link">
            Movies
          </NavLink>
          <NavLink to="/shows" activeClassName="active-link">
            Tv Shows
          </NavLink>
          <NavLink to="/persons" activeClassName="active-link">
            Persons
          </NavLink> */}
        </nav>
      ) : (
        <button id="side-nav" onClick={() => toggleDrawer()}>
          <img src={menu} alt="menu icon" />
        </button>
      )}
    </header>
  );
};

export default Header;
