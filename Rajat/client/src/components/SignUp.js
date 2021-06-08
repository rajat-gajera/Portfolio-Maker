import React, { useState } from "react";
import "../CSS/signup.css";
import { useHistory } from "react-router-dom";
const SignUp = () => {
  const history = useHistory();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    cpassword: "",
  });
  const updateData = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUserData({ ...userData, [name]: value });
    ///console.log(userData);
  };
  const postData = async (event) => {
    event.preventDefault();

    const { name, email, phone, work, password, cpassword } = userData;
    if (!name || !email || !phone || !work || !password || !cpassword) {
      window.alert("all fields are mandatory!");
      return;
    }
    if (password !== cpassword) {
      window.alert("password and confirm password must be same");
      return;
    }

    try {
      const result = await fetch("/signup", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json ",
          Accept: "application/json",
          "Access-Control-Origin": "*",
        },
        body: JSON.stringify({ name, email, phone, work, password, cpassword }),
      });

      const ddata = await result.json();
      const jdata = JSON.stringify(ddata);
      const data = JSON.parse(jdata);

      if (result.status === 201) {
        window.alert(data.message);
        history.push("/signin");
      } else {
        window.alert(data.error);
      }
    } catch (e) {
      console.log("aya");
      console.log(e);
    }
  };

  return (
    <div className="signup-main-container">
      <div className="signup-container-mainsite">
        <div className="signupform-main-container">
          <p className="signuptitle">Sign Up</p>
          <form className="signup-form" method="POST">
            <div className="signup-main-form-group">
              <input
                className="signup-main-input"
                required="true"
                type="text"
                name="name"
                value={userData.name}
                onChange={updateData}
                autoComplete="off"
                placeholder="Name"
              />
            </div>
            <div className="signup-main-form-group">
              <input
                className="signup-main-input"
                required="true"
                type="text"
                name="email"
                value={userData.email}
                onChange={updateData}
                autoComplete="off"
                placeholder="Email"
              />
            </div>
            <div className="signup-main-form-group">
              <input
                className="signup-main-input"
                required="true"
                type="text"
                name="phone"
                value={userData.phone}
                onChange={updateData}
                autoComplete="off"
                placeholder="Contact Number"
              />
            </div>
            <div className="signup-main-form-group">
              <input
                className="signup-main-input"
                required="true"
                type="text"
                name="work"
                value={userData.work}
                onChange={updateData}
                autoComplete="off"
                placeholder="Profession"
              />
            </div>

            <div className="signup-main-form-group">
              <input
                className="signup-main-input"
                required="true"
                type="password"
                name="password"
                value={userData.password}
                onChange={updateData}
                autoComplete="off"
                placeholder="Password"
              />
            </div>
            <div className="signup-main-form-group">
              <input
                className="signup-main-input"
                required="true"
                type="password"
                name="cpassword"
                value={userData.cpassword}
                onChange={updateData}
                autoComplete="off"
                placeholder="Confirm Password"
              />
            </div>
            {/* <div className="signup-main-form-group">
              <textarea
                className="signup-main-input-text-area"
                required="true"
                type="textarea"
                name="about"
                //   value={email}
                //   onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
                placeholder="About "
              />
            </div> */}
            <div className="signup-main-form-group">
              <input
                type="submit"
                value="Sign Up"
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

export default SignUp;
