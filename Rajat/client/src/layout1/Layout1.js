import React, { useState, useEffect } from "react";
import "../App.css";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.css";
import Home from "./components/Home";
import { Route, Switch, useParams, useHistory } from "react-router-dom";
import About from "./components/About";
import Writing from "./components/Writing";
import Contact from "./components/Contact";
import Work from "./components/Work";
const Layout1 = () => {
  const history = useHistory();

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
        history.push("/404");
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
    <div className="App">
      <div className="navsticky">
        <Navbar userid={userid} />
      </div>
      <div>
        <Switch>
          {/* <Route exact path="/silverport/:userid">
            <Redirect
              from="/silverport"
              to="silverport/:userid/home"
            ></Redirect> */}
          {/* </Route>{" "} */}
          <Route exact path={"/silverport/:userid/about"}>
            <About userid={userid} />
          </Route>
          <Route exact path={"/silverport/:userid/home"}>
            <Home userid={userid} />
          </Route>
          <Route exact path="/silverport/:userid/writing">
            <Writing userid={userid} />
          </Route>
          <Route exact path="/silverport/:userid/contact">
            <Contact userid={userid} />
          </Route>
          <Route exact path="/silverport/:userid/work">
            <Work userid={userid} />
          </Route>
          <Route>
            <div>404 error</div>
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default Layout1;
