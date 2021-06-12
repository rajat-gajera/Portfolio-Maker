import React, { useEffect, useState } from "react";
import "../CSS/home.css";
import PortfolioElement from "./PortfolioElement";

const Home = () => {
  const [portfolios, setPortfolios] = useState([]);

  const getPortfolios = async () => {
    try {
      const result = await fetch("/getportfolios", {
        method: "GET",
        headers: {
          "Content-Type": "application/json ",
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
        setPortfolios(jsdata);
      } else {
        const error = new Error(result.error);
        throw error;
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getPortfolios();
  }, []);
  return (
    <div className="home-main-container">
      <div className="home-container-mainsite">
        <h1 className="home-title-mainsite">Let's Make Your Portfolio</h1>
      </div>
      <div className="main-port-conatainer">
        {portfolios.map((port) => {
          return <PortfolioElement portfolio={port} />;
        })}
      </div>
    </div>
  );
};

export default Home;
