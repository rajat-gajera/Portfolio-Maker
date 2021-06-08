import React from "react";
import "../CSS/projectelement.css";
import { NavLink } from "react-router-dom";
import rjt from "../images/Rajat.jpeg";
const ProjectElement = (props) => {
  const read = "Read More >>>";
  return (
    <div className="project-element">
      <div className="project-text-container">
        <p className="title">{props.project.name}</p>

        <p className="subtitle">{props.project.type}</p>
        <NavLink
          to=""
          onClick={() => {
            alert("Clicker");
          }}
        >
          {read}
        </NavLink>
      </div>
      <div className="project-img-container">
        <img
          src={"https://gateway.ipfs.io/ipfs/" + props.project.logoimage}
          className="project-img"
          alt=""
        ></img>
      </div>
    </div>
  );
};

export default ProjectElement;
