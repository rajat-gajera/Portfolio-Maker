import React from "react";
import { NavLink } from "react-router-dom";
import "../CSS/blogelemetmain.css";
const BlogElement = (props) => {
  const vie = "Read More >>>";
  const blogid = props.blog._id;
  return (
    <div className="blog-main-element">
      <div className="blog-main-element-text-container">
        <p className="blog-main-element-name">{props.blog.title} </p>
        <p className="blog-main-element-topics">
          {props.blog.topics}
          <span className="blog-main-element-date">{props.blog.date}</span>
        </p>
        <p className="blog-main-element-subtitle">{props.blog.subtitle}</p>
        <p className="blog-main-element-viewlink">
          <NavLink to={`readblog/${blogid}`} className="view-text-blog-main">
            {vie}
          </NavLink>
        </p>
      </div>
      <div className="blog-main-element-img-container">
        <img
          className="blog-logo-img"
          src={`https://gateway.ipfs.io/ipfs/${props.blog.blogimage}`}
        ></img>
      </div>
    </div>
  );
};

export default BlogElement;
