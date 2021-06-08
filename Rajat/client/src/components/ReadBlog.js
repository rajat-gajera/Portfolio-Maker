import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import "../CSS/readbog.css";
const ReadBlog = () => {
  const history = useHistory();
  const { blogid } = useParams();
  const [blog, setBlog] = useState({});
  const getBlog = async () => {
    try {
      const url = "/blog/" + blogid;
      const result = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json ",
          Accept: "application/json",
        },
        credentials: "include",
      });
      const data = await result.json();
      const ddata = JSON.stringify(data);
      console.log(ddata);
      const jsdata = JSON.parse(ddata);
      if (result.status === 200 && data) {
        setBlog(jsdata);
        console.log(jsdata);
      } else {
        console.log(result.error);
        window.alert("Something went wrong");
        history.goBack();
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getBlog();
  }, [blogid]);
  return (
    <div className="readblog-main-container">
      <div>
        <p className="readblog-title">{blog.title}</p>
      </div>
      <div className="readblog-img-container">
        <img
          className="readblog-img"
          src={`https://gateway.ipfs.io/ipfs/${blog.blogimage}`}
        ></img>
      </div>
      <div>
        <p className="readblog-subtitle">{blog.subtitle}</p>
      </div>
      <div>
        <p className="readblog-topics">
          {blog.topics} <span className="readblog-date">{blog.date}</span>
        </p>
      </div>
      <div>
        <p className="readblog-description">{blog.description}</p>
      </div>
    </div>
  );
};

export default ReadBlog;
