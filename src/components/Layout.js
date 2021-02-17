import React, { useState } from "react";
import Header from "./Header";
// import Search from "./Search";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
const Layout = () => {
  const history = useHistory();
  const [isOpenSidenav, setIsOpenSidenav] = useState(false);
  const toggleDrawer = () => {
    setIsOpenSidenav(!isOpenSidenav);
  };
  return (
    <div>
      <Header toggleDrawer={toggleDrawer} />
      <div>
        <div>
          <Drawer
            // style={{ width: "400px" }}
            anchor="right"
            onBackdropClick={() => setIsOpenSidenav(false)}
            open={isOpenSidenav}
          >
            <section className="sidenav" style={{ width: "300px" }}>
              <nav className="side-nav">
                <div
                  onClick={() => {
                    history.push({ pathname: `/movies` });
                    setIsOpenSidenav(false);
                  }}
                >
                  Movies
                </div>
                <div
                  onClick={() => {
                    history.push({ pathname: `/shows` });
                    setIsOpenSidenav(false);
                  }}
                >
                  Tv Shows
                </div>
                <div
                  onClick={() => {
                    history.push({ pathname: `/persons` });
                    setIsOpenSidenav(false);
                  }}
                >
                  Persons
                </div>
              </nav>
            </section>
          </Drawer>
        </div>
      </div>
    </div>
  );
};

export default Layout;
