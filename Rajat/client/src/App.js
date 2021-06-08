import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import Maker from "./components/Maker";
import Layout1 from "./layout1/Layout1";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReadBlog from "./components/ReadBlog";
// import About from "./components/About";
// import Writing from "./components/Writing";
// import Contact from "./components/Contact";
// import Work from "./components/Work";
function App() {
  const history = useHistory();
  // console.log(history.location.pathname);
  // if (history.location.pathname === "/silverport") return <Layout1 />;
  // else

  return (
    <Switch>
      <Route exact path="/">
        <Redirect from="/" to="/home"></Redirect>
      </Route>
      <Route path="/silverport/:userid/">
        <Layout1></Layout1>
      </Route>
      <Route path="/readblog/:blogid/">
        <ReadBlog />
      </Route>
      <Route path="/">
        <Maker />
      </Route>
      <Route>
        <div>404error</div>
      </Route>
    </Switch>
  );
}

export default App;
//upr api thi type ly ne just if else thi return krvanu thay che
