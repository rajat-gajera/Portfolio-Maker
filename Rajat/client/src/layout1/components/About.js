import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../CSS/about.css";
import rjt from "../images/Rajat.jpeg";
import { NavLink } from "react-router-dom";
const About = (props) => {
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
            <p className="sl-quate">{portfolio.tagline}</p>
            <p className="sl-about-description">
              {/* <p>Hi, I'm Rajat.</p>
              <p>
                I am from Surat,Gujarat. I am currently persuing by B.tech in
                Dharmsinh Desai University,Nadiad.
              </p>
              <p>
                I am pre-final year Student of Information Technology Stream.I
                have worked on some Technology other than curriculam like,
                Blockchain,Android and MERN Stack.
              </p>
              <p>
                I am Enthusiastic about Blockchain Technology and I have made on
                Project based on this Technology.I am also familier with Android
                Development and MERN Stack Development as I did some Project on
                this Technology as well.
              </p>
 */}
              <p>
                {" "}
                {portfolio.about}
                Have an interesting project?
                <span>
                  <NavLink to={`/silverport/${userid}/contact`}>
                    Let's talk.
                  </NavLink>
                </span>
              </p>
            </p>
          </div>
          <div className="sl-abt-img-container">
            <div className="sl-abt-imgg">
              <img className="sl-abt-img" src={rjt} alt=""></img>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
