import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../CSS/myportfolio.css";
const { create } = require("ipfs-http-client");
const ipfsC = create({
  host: "ipfs.infura.io",
  port: "5001",
  protocol: "https",
});
 
const Myportfolio = () => {
  const history = useHistory();
  const [flag, setFlag] = useState(false);
  const [rootUser, setRootUser] = useState({
    _id: "",
    name: "",
    email: "",
    phone: "",
    work: "",
  });
  const [portfolio, setPortfolio] = useState({
    name: "",
    email: "",
    work: "",
    description: "",
    tagline: "",
    about: "",
  });
  const [profileimage, setProfileimage] = useState();
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
  const getPortfolio = async () => {
    try {
      const url = "/portfolio/" + rootUser._id;
      console.log(url);
      const result = await fetch(url, {
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
        const { userid, name, email, work, description, tagline, about } =
          jsdata;
        setFlag(true);
        setPortfolio({
          userid,
          name,
          email,
          work,
          description,
          tagline,
          about,
        });
      } else {
        const error = new Error(result.error);
        throw error;
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getRootUser();
  }, []);

  useEffect(() => {
    getPortfolio();
  }, [rootUser]);
  const updateData = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setPortfolio({ ...portfolio, [name]: value });
    console.log(portfolio);
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
        setProfileimage(buffer);
      } catch (e) {
        console.log(e);
      }
    };
  };
  const makePortfolio = async (event) => {
    event.preventDefault();

    try {
      const userid = rootUser._id;
      const { name, email, work, description, tagline, about } = portfolio;

      const result = await fetch("/makeportfolio", {
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
          email,
          work,
          description,
          tagline,
          about,
        }),
      });

      const ddata = await result.json();
      const jdata = JSON.stringify(ddata);
      const data = JSON.parse(jdata);

      if (result.status === 201) {
        window.alert(data.message);
      } else {
        window.alert(data.error);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const setProfilePicture = async (event) => {
    event.preventDefault();
    try {
      const hash = await ipfsC.add(profileimage, {
        progress: (prog) => console.log(`received: ${prog}`),
      });
      console.log(hash);
      const userid = rootUser._id;
      const imagehash = hash.path;
      const result = await fetch("/updateprofilepic", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Origin": "*",
        },
        body: JSON.stringify({
          userid,
          imagehash,
        }),
      });

      const ddata = await result.json();
      const jdata = JSON.stringify(ddata);
      const data = JSON.parse(jdata);

      if (result.status === 201) {
        window.alert(data.message);
      } else {
        window.alert(data.error);
      }
    } catch (e) {
      console.log(e);
    }
    // try {
    //   const formData = new FormData();
    //   formData.append("userid", rootUser._id);
    //   formData.append("profileimage", profileimage);
    //   console.log(formData);
    //   const result = await axios.post("/updateprofilepic", formData);
    // const result = await fetch("/updateprofilepic", {
    //   method: "POST",
    //   mode: "cors",
    //   headers: {
    //     "Content-Type": "form-data",
    //     Accept: "application/json",
    //     "Access-Control-Origin": "*",
    //   },
    //   body: JSON.stringify({
    //     userid: rootUser._id,
    //     profileimage: profileimage,
    //   }),
    // });

    //   if (result.status === 201) {
    //     window.alert("Image Uploaded Successfully");
    //   } else {
    //     window.alert("Failed");
    //   }
    // } catch (e) {
    //   console.log(e);
    // }
  };
  return (
    <div>
      <div className="myportfolio-main-container">
        <div className="myportfolio-container-mainsite">
          <input
            disabled={!flag}
            type="button"
            className="myportfolio-title-mainsite"
            onClick={() => {
              history.push("/silverport/" + portfolio.userid + "/home");
            }}
            value="Go to Your Portfolio >>"
          ></input>
        </div>
        {/* <div className="myportfolio-container-mainsite2">
          <a href="#go" className="myportfolio-title-mainsite">
            {"Create OR Edit your portfolio"}
          </a>
        </div> */}
        <div className="myportfolio-port-conatainer" id="go">
          <form className="portfolio-form" method="POST">
            <div className="port-form-group">
              <input
                className="port-input"
                required="true"
                type="text"
                name="name"
                value={portfolio.name}
                onChange={updateData}
                autoComplete="off"
                placeholder="Enter your name"
              />
            </div>
            <div className="port-form-group">
              <input
                className="port-input"
                required="true"
                type="text"
                name="email"
                value={portfolio.email}
                onChange={updateData}
                autoComplete="off"
                placeholder="Enter your email"
              />
            </div>
            <div className="port-form-group">
              <input
                className="port-input"
                required="true"
                type="text"
                name="work"
                value={portfolio.work}
                onChange={updateData}
                autoComplete="off"
                placeholder="Enter your Profession"
              />
            </div>
            <div className="port-form-group">
              <textarea
                className="port-input-text-area"
                required="true"
                type="textarea"
                name="description"
                value={portfolio.description}
                onChange={updateData}
                autoComplete="off"
                placeholder="Description"
              />
            </div>
            <div className="port-form-group">
              <input
                className="port-input-text-area"
                required="true"
                type="text"
                name="tagline"
                value={portfolio.tagline}
                onChange={updateData}
                autoComplete="off"
                placeholder="About title"
              />
            </div>
            <div className="port-form-group">
              <textarea
                className="port-input-text-area"
                required="true"
                type="textarea"
                name="about"
                value={portfolio.about}
                onChange={updateData}
                autoComplete="off"
                placeholder="About "
              />
            </div>

            <div className="port-form-group">
              <input
                type="submit"
                value="Submit"
                className="port-form-submit"
                data-wait="Please wait..."
                onClick={makePortfolio}
              />
            </div>
          </form>
          <form
            className="portfolio-form"
            method="POST"
            enctype="multipart/form-data"
          >
            <div className="port-form-group">
              Profile Image:{" "}
              <input
                className="port-input-file"
                required="true"
                type="file"
                name="profileimage"
                // value={profileimage}
                onChange={updateImageData}
                autoComplete="off"
                placeholder="Profile Image "
                accept=".png, .jpg, .jpeg"
              />
            </div>
            <div className="port-form-group">
              <input
                type="submit"
                value="Submit"
                className="port-form-submit"
                data-wait="Please wait..."
                onClick={setProfilePicture}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Myportfolio;
