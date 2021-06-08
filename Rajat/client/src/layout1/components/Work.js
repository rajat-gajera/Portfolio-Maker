import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../CSS/work.css";
import ProjectElement from "./ProjectElement";
const Work = () => {
  const [projects, setProjects] = useState([]);
  const [portfolio, setPortfolio] = useState({});
  let { userid } = useParams();
  const getPortfolio = async () => {
    try {
      const url = "/portfolio/" + userid;
      const result = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json ",
          Accept: "application/json",
        },
        credentials: "include",
      });
      if (!result) {
        throw new Error("didn't get profolio");
      }
      const jsdata = await result.json();
      // const jdata = await JSON.stringify(data);
      // const jsdata = await JSON.parse(jdata);
      if (result.status !== 200) {
        console.log(jsdata.error);
      }
      setPortfolio(jsdata);

      console.log(portfolio);
    } catch (e) {
      console.log(e);
    }
  };
  const getProjects = async () => {
    try {
      const url = "/projects/" + userid;
      const result = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json ",
          Accept: "application/json",
        },
        credentials: "include",
      });
      if (!result) {
        throw new Error("didn't get profolio");
      }
      const jsdata = await result.json();
      // const jdata = await JSON.stringify(data);
      // const jsdata = await JSON.parse(jdata);
      if (result.status !== 200) {
        console.log(jsdata.error);
      }
      setProjects(jsdata);

      console.log(portfolio);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getPortfolio();
    getProjects();
  }, []);
  return (
    <>
      <div className="work-main-container">
        <div className="work-home-container">
          <h1 style={{ color: "white", fontSize: "5vw", padding: "5vw" }}>
            Projects
          </h1>
          {projects.map((prfl) => {
            return <ProjectElement project={prfl} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Work;
