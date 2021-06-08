import React from "react";
import { NavLink } from "react-router-dom";
import "../CSS/portfolioelement.css";
const PortfolioElement = () => {
  const vie = "view >>>";
  return (
    <div className="portfolio-element">
      <div className="portfolio-element-text-container">
        <p className="portfolio-element-name"> Rajat Gajera </p>
        <p className="portfolio-element-role">Block chain Developer</p>
        <p className="portfolio-element-viewlink">
          <NavLink to="/" className="view-text-portfolio">
            {vie}
          </NavLink>
        </p>
      </div>
      <div className="portfolio-element-img-container"></div>
    </div>
  );
};

export default PortfolioElement;
