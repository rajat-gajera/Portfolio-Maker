import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../CSS/contact.css";

const Contact = () => {
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
            <p className="sl-quate">Let's talk.</p>
            <p className="sl-description">
              <p>Hi, I'm Rajat.</p>
              <p>
                Get in touch via the form below, or by emailing
                <span className="sl-mail"> {portfolio.email}</span>
              </p>
            </p>
            <form className="sl-register-form" method="POST">
              <div className="sl-form-group">
                <input
                  className="sl-contact-input"
                  type="text"
                  name="name"
                  //   value={email}
                  //   onChange={(e) => setEmail(e.target.value)}
                  autoComplete="off"
                  placeholder="Enter your name"
                />
              </div>
              <div className="sl-form-group">
                <input
                  className="sl-contact-input"
                  type="text"
                  name="email"
                  //   value={email}
                  //   onChange={(e) => setEmail(e.target.value)}
                  autoComplete="off"
                  placeholder="Enter yout email address"
                />
              </div>
              <div className="sl-form-group">
                <textarea
                  className="sl-contact-input-text-area"
                  type="text-area"
                  name="message"
                  //   value={email}
                  //   onChange={(e) => setEmail(e.target.value)}
                  autoComplete="off"
                  placeholder="Enter yout message"
                />
              </div>
              <div className="sl-form-group">
                <input
                  type="submit"
                  value="Submit"
                  data-wait="Please wait..."
                  className="sl-form-submit "
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
