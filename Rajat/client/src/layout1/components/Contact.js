import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import "../CSS/contact.css";
import emailjs from "emailjs-com";
import configData from "../.././config.json";

const Contact = () => {
  const [portfolio, setPortfolio] = useState({});
  let { userid } = useParams();
  const history = useHistory();
  const [message, setMessage] = useState({ name: "", email: "", message: "" });
  const updateData = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setMessage({ ...message, [name]: value });
    // console.log(message);
  };
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
  const handlesubmit = async (e) => {
    e.preventDefault();
    const templateId = configData.EMAILJS_TEMPID;
    console.log(message.message);
    await sendMessage(templateId, {
      message_html: `${message.message}`,
      from_name: message.name,
      reply_to: message.email,
      to_email: portfolio.email,
      to_name: portfolio.name,
    });
  };
  const sendMessage = (templateId, variables) => {
    const userid = configData.EMAILJS_USERID;
    const serviceid = configData.EMAILJS_SERVICEID;

    // console.log(userid + serviceid);
    emailjs
      .send(serviceid, templateId, variables, userid)
      .then((res) => {
        console.log("Email successfully sent!");
        window.alert("Message Successfully Sent!");
        window.location.reload();
      })
      // Handle errors here however you like, or use a React error boundary
      .catch((err) =>
        console.error(
          "Oh well, you failed. Here some thoughts on the error that occured:",
          err
        )
      );
  };
  return (
    <>
      <div className="sl-main-container">
        <div className="sl-home-container">
          <div className="sl-home">
            <p className="sl-quate">Let's talk.</p>
            <p className="sl-description">
              <p>Hi, I'm {portfolio.name}.</p>
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
                  value={message.name}
                  onChange={updateData}
                  autoComplete="off"
                  placeholder="Enter your name"
                />
              </div>
              <div className="sl-form-group">
                <input
                  className="sl-contact-input"
                  type="text"
                  name="email"
                  value={message.email}
                  onChange={updateData}
                  autoComplete="off"
                  placeholder="Enter yout email address"
                />
              </div>
              <div className="sl-form-group">
                <textarea
                  className="sl-contact-input-text-area"
                  type="text-area"
                  name="message"
                  value={message.message}
                  onChange={updateData}
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
                  onClick={handlesubmit}
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
