import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import "../CSS/sigin.css";
import { UserContext } from "./Maker";
const SignIn = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { state, dispatch } = useContext(UserContext);

  const postData = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      window.alert("please Enter Email And Password!");
      return;
    }
    try {
      console.log(JSON.stringify({ email, password }));
      const result = await fetch("/signin", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json ",
          Accept: "application/json",
          "Access-Control-Origin": "*",
        },
        body: JSON.stringify({ email, password }),
      });
      const ddata = await result.json();
      const jdata = JSON.stringify(ddata);
      const data = JSON.parse(jdata);
      if (result.status === 201) {
        dispatch({ type: "USER", payload: true });

        window.alert(data.message);
        history.push("/home");
      } else {
        window.alert(data.error);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="signup-main-container">
      <div className="signup-container-mainsite">
        <div className="signupform-main-container">
          <p className="signintitle">Sign In</p>
          <form className="signup-form" method="POST">
            <div className="signup-main-form-group">
              <input
                className="signup-main-input"
                required="true"
                type="text"
                name="name"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                autoComplete="off"
                placeholder="Email"
              />
            </div>
            <div className="signup-main-form-group">
              <input
                className="signup-main-input"
                required="true"
                type="password"
                name="pasword"
                onChange={(pas) => setPassword(pas.target.value)}
                autoComplete="off"
                placeholder="Password"
              />
            </div>
            <div className="signup-main-form-group">
              <input
                type="submit"
                value="Sign In"
                onClick={postData}
                className="signup-main-form-submit"
                data-wait="Please wait..."
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
