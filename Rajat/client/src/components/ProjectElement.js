import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import "../CSS/projectelement.css";
const ProjectElement = (props) => {
  const history = useHistory(); 
  const removeproject = async () => {
    try {
      // await window.alert("hi");
      const url = "/removeproject/" + props.project._id;
      console.log(url);
      const result = await fetch(url, { method: "DELETE" });
      const data = await result.json();
      if (result.status === 202 && data) {
        window.alert(data.message);
        history.push("/projects");
      } else {
        window.alert(data.error);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="project-main-element">
      <div className="project-main-element-text-container">
        <p className="project-main-element-name"> {props.project.name} </p>
        <p className="project-main-element-type">{props.project.type}</p>

        <p className="project-main-element-viewlink">
          <NavLink to="/" className="view-text-project-main">
            {"Learn More >>"}
          </NavLink>
        </p>
        <p className="project-main-element-viewlink">
          <p className="remove-text-project-main" onClick={removeproject()}>
            {"Remove"}
          </p>
        </p>
      </div>
      <div className="project-main-element-img-container">
        <img
          className="project-logo-img"
          src={"https://gateway.ipfs.io/ipfs/" + props.project.logoimage}
          alt=""
        ></img>
      </div>
    </div>
  );
};

export default ProjectElement;
