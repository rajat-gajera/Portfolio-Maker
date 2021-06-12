import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "../CSS/navbar.css";
import { UserContext } from "./Maker";
const Navbar = () => {
  const [show, setShow] = useState(false);
  const { state, dispatch } = useContext(UserContext);

  const RenderMenu = () => {
    if (state) {
      return (
        <div className="navbar">
          <nav className="navbar navbar-expand-lg navbar-light ">
            <div className="container-fluid">
              <NavLink className="navbar-brand" to="/home">
                Silver Blog
              </NavLink>
              <button
                className="navbar-toggler collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
                onClick={() => setShow(!show)}
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                style={show ? { display: "block" } : { display: "none" }}
                className={"collapse navbar-collapse"}
                id="navbarSupportedContent"
              >
                <ul className="nav navbar-nav ms-lg-auto mb-2 mb-lg-0">
                  <li className="nav-item me-4  ">
                    <NavLink
                      className="nav-link active"
                      aria-current="page"
                      to="/home"
                    >
                      Home
                    </NavLink>
                  </li>
                  <li className="nav-item  me-4">
                    <NavLink className="nav-link" to="/blogs">
                      Blogs
                    </NavLink>
                  </li>
                  <li className="nav-item  me-4">
                    <NavLink className="nav-link" to="/myportfolio">
                      My Portfolio
                    </NavLink>
                  </li>

                  <li className="nav-item me-4 ">
                    <NavLink className="nav-link" to="/projects">
                      Projects
                    </NavLink>
                  </li>
                  {/* <li className="nav-item me-4 ">
                    <NavLink className="nav-link" to="/signin">
                      Sign In
                    </NavLink>
                  </li>

                  <li className="nav-item me-4 ">
                    <NavLink className="nav-link" to="/signup">
                      Sign Up
                    </NavLink>
                  </li> */}
                  <li className="nav-item me-4 ">
                    <NavLink className="nav-link" to="/signout">
                      Sign Out
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      );
    } else {
      return (
        <div className="navbar">
          <nav className="navbar navbar-expand-lg navbar-light ">
            <div className="container-fluid">
              <NavLink className="navbar-brand" to="/home">
                Silver Blog
              </NavLink>
              <button
                className="navbar-toggler collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
                onClick={() => setShow(!show)}
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                style={show ? { display: "block" } : { display: "none" }}
                className={"collapse navbar-collapse"}
                id="navbarSupportedContent"
              >
                <ul className="nav navbar-nav ms-lg-auto mb-2 mb-lg-0">
                  <li className="nav-item me-4  ">
                    <NavLink
                      className="nav-link active"
                      aria-current="page"
                      to="/home"
                    >
                      Home
                    </NavLink>
                  </li>
                  <li className="nav-item  me-4">
                    <NavLink className="nav-link" to="/blogs">
                      Blogs
                    </NavLink>
                  </li>
                  <li className="nav-item  me-4">
                    <NavLink className="nav-link" to="/myportfolio">
                      My Portfolio
                    </NavLink>
                  </li>

                  <li className="nav-item me-4 ">
                    <NavLink className="nav-link" to="/projects">
                      Projects
                    </NavLink>
                  </li>
                  <li className="nav-item me-4 ">
                    <NavLink className="nav-link" to="/signin">
                      Sign In
                    </NavLink>
                  </li>

                  <li className="nav-item me-4 ">
                    <NavLink className="nav-link" to="/signup">
                      Sign Up
                    </NavLink>
                  </li>
                  {/* <li className="nav-item me-4 ">
                    <NavLink className="nav-link" to="/bakiiiiii">
                      Sign Out
                    </NavLink>
                  </li> */}
                </ul>
              </div>
            </div>
          </nav>
        </div>
      );
    }
  };
  return (
    <>
      <RenderMenu />
    </>
  );
};

export default Navbar;
