import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import rjt from "../images/Rajat.jpeg";
import "../CSS/writing.css";
import BlogElement from "./BlogElement";
const Writing = () => {
  let { userid } = useParams();

  const [blogs, setBlogs] = useState([]);
  const getBlogs = async () => {
    try {
      const url = "/blogs/" + userid;
      const result = await fetch(url, {
        methods: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
      });
      if (result.status !== 200) {
        const error = new Error(result.error);
        throw error;
      }
      const data = await result.json();
      if (data) {
        const ddata = JSON.stringify(data);
        console.log(ddata);
        const jsdata = JSON.parse(ddata);
        setBlogs(jsdata);
      } else {
        const error = new Error(result.error);
        throw error;
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getBlogs();
  }, []);
  return (
    <>
      <div className="writing-main-container">
        <div className="writing-home-container">
          <h1 style={{ color: "white", fontSize: "5vw", padding: "5vw" }}>
            Here lies my blog
          </h1>
          <p
            style={{
              fontSize: "1.5w",
              paddingLeft: "5vw",
            }}
          >
            ...is what this page might say some day.
          </p>
          {blogs.map((b) => {
            return <BlogElement blog={b} />;
          })}
         </div>
      </div>
    </>
  );
};

export default Writing;
