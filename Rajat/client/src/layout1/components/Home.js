import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../CSS/home.css";
const Home = () => {
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
  useEffect(() => {
    getPortfolio();
  }, []);
  return (
    <>
      <div className="sl-main-container">
        <div className="sl-home-container">
          <div className="sl-home">
            <p className="sl-name">Hi, I'm {portfolio.name}.</p>
            <p className="sl-role">{portfolio.work}</p>
            <p className="sl-description">{portfolio.description}</p>
          </div>
          <div className="sl-img-container">
            <img
              className="sl-img"
              src={"https://gateway.ipfs.io/ipfs/" + portfolio.profileimage}
              alt=""
            ></img>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
