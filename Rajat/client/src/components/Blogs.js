import React, { useState, useEffect } from "react";
import "../CSS/blogs.css";
import { useHistory } from "react-router-dom";

import BlogElement from "./BlogElement";
const { create } = require("ipfs-http-client");
const ipfsC = create({
  host: "ipfs.infura.io",
  port: "5001",
  protocol: "https",
});
const Blogs = () => {
  const history = useHistory();

  const [rootUser, setRootUser] = useState({
    _id: "",
    name: "",
    email: "",
    phone: "",
    work: "",
  });
  const [blog, setBlog] = useState({
    title: "",
    topics: "",
    subtitle: "",
    description: "",
  });
  const [blogimage, setBlogimage] = useState();
  const getRootUser = async () => {
    try {
      const result = await fetch("/getuser", {
        method: "GET",
        headers: {
          "Content-Type": "application/json ",
          Accept: "application/json",
        },
        credentials: "include",
      });

      if (result.status === 401) {
        history.push("/signin");
        return;
      }
      const data = await result.json();
      const ddata = JSON.stringify(data);
      console.log(ddata);
      const jsdata = JSON.parse(ddata);
      const { _id, name, email, phone, work } = jsdata;

      setRootUser({ _id, name, email, phone, work });
    } catch (e) {
      console.log("-----------------============");
      console.log(e);
    }
  };
  useEffect(() => {
    getRootUser();
  }, []);
  const updateData = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setBlog({ ...blog, [name]: value });
  };
  const updateImageData = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = async () => {
      try {
        const buffer = Buffer.from(reader.result);
        console.log(buffer);
        setBlogimage(buffer);
      } catch (e) {
        console.log(e);
      }
    };
  };
  const addBlog = async (event) => {
    event.preventDefault();
    try {
      const hashh = await ipfsC.add(blogimage, {
        progress: (prog) => console.log(`recived : ${prog}`),
      });
      const hash = hashh.path;
      const userid = rootUser._id;
      const { title, topics, subtitle, description } = blog;
      const result = await fetch("/addblog", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Origin": "*",
        },
        body: JSON.stringify({
          userid,
          title,
          topics,
          subtitle,
          description,
          hash,
        }),
      });
      const ddata = await result.json();
      const jdata = JSON.stringify(ddata);
      const data = JSON.parse(jdata);

      if (result.status === 201) {
        window.alert(data.message);
        history.push("/blogs");
      } else {
        window.alert(data.error);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const [blogs, setBlogs] = useState([]);
  const getBlogs = async () => {
    try {
      const url = "/blogs/" + rootUser._id;
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
  }, [rootUser]);
  return (
    <div>
      <div className="blogs-main-container">
        <div className="blogs-container-mainsite"></div>
        <div className="main-blog-conatainer"></div>
        {blogs.map((b) => {
          return <BlogElement blog={b}></BlogElement>;
        })}

        <div className="add-blog-form">
          <h3>Add Blog</h3>
          <form className="addproject-form" method="POST">
            <div className="blog-form-group">
              <input
                className="blog-input"
                required="true"
                type="text"
                name="title"
                value={blog.title}
                onChange={updateData}
                autoComplete="off"
                placeholder="Title"
              />
            </div>
            <div className="blog-form-group">
              <input
                className="blog-input"
                required="true"
                type="text"
                name="topics"
                value={blog.topics}
                onChange={updateData}
                autoComplete="off"
                placeholder="Topics"
              />
            </div>

            <div className="blog-form-group">
              <textarea
                className="blog-input-text-area"
                required="true"
                type="textarea"
                name="subtitle"
                value={blog.subtitle}
                onChange={updateData}
                autoComplete="off"
                placeholder="Subtitle"
              />
            </div>
            <div className="blog-form-group">
              <textarea
                className="blog-input-text-area"
                required="true"
                type="textarea"
                name="description"
                value={blog.description}
                onChange={updateData}
                autoComplete="off"
                placeholder="Blog"
              />
            </div>
            <div className="blog-form-group">
              Logo :{" "}
              <input
                className="blog-input-file"
                required="true"
                type="file"
                name="profileimage"
                onChange={updateImageData}
                autoComplete="off"
                placeholder="Profile Image "
                accept=".png, .jpg, .jpeg"
              />
            </div>
            <div className="blog-form-group">
              <input
                type="submit"
                // value="mit"
                className="blog-form-submit"
                data-wait="Please wait..."
                onClick={addBlog}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
