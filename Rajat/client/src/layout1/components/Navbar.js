import React, { useState, useEffect } from "react";
import { useParams,useHistory } from "react-router-dom";
import "../CSS/navbar.css";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
const Navbar = (props) => {
  const history = useHistory();
  const [show, setShow] = useState(false);
  
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
        <div className="container-fluid ms-4">
          <button
            className="navbar-toggler  "
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
            <ul className="navbar-nav    mb-2 mb-lg-0">
              <li className="nav-item   me-4">
                <NavLink
                  className="nav-link active"
                  aria-current="page"
                  to={"/silverport/" + props.userid + "/home"}
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item me-4">
                <NavLink
                  className="nav-link"
                  to={"/silverport/" + props.userid + "/about"}
                >
                  About
                </NavLink>
              </li>
              <li className="nav-item me-4">
                <NavLink
                  className="nav-link"
                  to={"/silverport/" + props.userid + "/work"}
                >
                  Work
                </NavLink>
              </li>

              <li className="nav-item me-4">
                <NavLink
                  className="nav-link"
                  to={"/silverport/" + props.userid + "/writing"}
                >
                  Writing
                </NavLink>
              </li>

              <li className="nav-item  ">
                <NavLink
                  className="nav-link"
                  to={"/silverport/" + props.userid + "/contact"}
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
