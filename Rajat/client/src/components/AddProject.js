import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../CSS/addproject.css";
import ProjectElement from "./ProjectElement";
const { create } = require("ipfs-http-client");
const ipfsC = create({
  host: "ipfs.infura.io",
  port: "5001",
  protocol: "https",
});

const AddProject = () => {
  const history = useHistory();
  const [project, setProject] = useState({
    name: "",
    type: "",
    description: "",
  });
  const [rootUser, setRootUser] = useState({
    _id: "",
    name: "",
    email: "",
    phone: "",
    work: "",
  });
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
  const [projects, setProjects] = useState([]);
  const getProjects = async () => {
    try {
      const url = "/projects/" + rootUser._id;
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
        setProjects(jsdata);
      } else {
        const error = new Error(result.error);
        throw error;
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getProjects();
  }, [rootUser]);
  const [logoimage, setlogoimage] = useState();
  const updateData = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setProject({ ...project, [name]: value });
  };
  const updateImageData = async (event) => {
    // const value = event.target.files[0];
    // console.log("image update");
    // setProfileimage(Buffer.from(event.target.files[0]));
    // console.log(profileimage);
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = async () => {
      try {
        const buffer = Buffer.from(reader.result);
        console.log(buffer);
        setlogoimage(buffer);
      } catch (e) {
        console.log(e);
      }
    };
  };
  const addProject = async (event) => {
    event.preventDefault();
    try {
      const hashh = await ipfsC.add(logoimage, {
        progress: (prog) => console.log(`received: ${prog}`),
      });
      const hash = hashh.path;
      const userid = rootUser._id;
      const { name, type, description } = project;
      const result = await fetch("/addproject", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Origin": "*",
        },
        body: JSON.stringify({
          userid,
          name,
          type,
          description,
          hash,
        }),
      });
      const ddata = await result.json();
      const jdata = JSON.stringify(ddata);
      const data = JSON.parse(jdata);

      if (result.status === 201) {
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
    <div>
      <div className="addproject-main-container">
        <div className="addproject-container-mainsite"></div>
        <div className="addproject-container-mainsite2">
           
          {projects.map((p) => {
            return <ProjectElement project={p} />;
          })}
        </div>
        <div className="addproject-port-conatainer" id="go">
          <h3>Add Project</h3>
          <form className="addproject-form" method="POST">
            <div className="port-form-group">
              <input
                className="port-input"
                required="true"
                type="text"
                name="name"
                value={project.name}
                onChange={updateData}
                autoComplete="off"
                placeholder="Name"
              />
            </div>
            <div className="port-form-group">
              <input
                className="port-input"
                required="true"
                type="text"
                name="type"
                value={project.email}
                onChange={updateData}
                autoComplete="off"
                placeholder="Type"
              />
            </div>

            <div className="port-form-group">
              <textarea
                className="port-input-text-area"
                required="true"
                type="textarea"
                name="description"
                value={project.description}
                onChange={updateData}
                autoComplete="off"
                placeholder="Description"
              />
            </div>
            <div className="port-form-group">
              Logo :{" "}
              <input
                className="port-input-file"
                required="true"
                type="file"
                name="profileimage"
                // value={logoimage}
                onChange={updateImageData}
                autoComplete="off"
                placeholder="Profile Image "
                accept=".png, .jpg, .jpeg"
              />
            </div>
            <div className="port-form-group">
              <input
                type="submit"
                value="mit"
                className="port-form-submit"
                data-wait="Please wait..."
                onClick={addProject}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProject;
