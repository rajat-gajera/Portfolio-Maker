import React from "react";
import "../CSS/blogelement.css";
import { NavLink } from "react-router-dom";
import rjt from "../images/Rajat.jpeg";
const BlogElement = (props) => {
  const read = "Read More >>>";
  const blogid = props.blog._id;
  return (
    <div className="blog-element">
      <div className="blog-text-container">
        <p className="title">{props.blog.title}</p>
        <p className="topics">
          Topics<span className="date">{props.blog.date}</span>
        </p>
        <p className="subtitle">{props.blog.subtitle}</p>
        <NavLink to={`/readblog/${blogid}`}>{read}</NavLink>
      </div>
      <div className="blog-img-container">
        <img
          src={`https://gateway.ipfs.io/ipfs/${props.blog.blogimage}`}
          className="blog-img"
          alt=""
        ></img>
      </div>
    </div>
  );
};

export default BlogElement;
