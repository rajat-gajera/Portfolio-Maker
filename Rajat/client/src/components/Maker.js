import React, { createContext, useReducer } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import Home from "./Home";
import Navbar from "./Navbar";
import Blogs from "./Blogs";
import MyPortfolio from "./Myportfolio";
import "../App.css";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import AddProject from "./AddProject";
import SignOut from "./SignOut";
import { initialState, reducer } from "../reducer/UseReducer";
export const UserContext = createContext();

const Maker = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const Routing = () => {
    return (
      <Switch>
        <Route exact path="/">
          <Redirect from="/" to="/home"></Redirect>
        </Route>

        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/blogs">
          <Blogs />
        </Route>
        <Route exact path="/myportfolio">
          <MyPortfolio />
        </Route>
        <Route exact path="/projects">
          <AddProject />
        </Route>
        <Route exact path="/signin">
          <SignIn />
        </Route>
        <Route exact path="/signup">
          <SignUp></SignUp>
        </Route>
        <Route exact path="/signout">
          <SignOut />
        </Route>
        {/* 
  <Route exact path="/silverport/about">
    <About />
  </Route>
  <Route exact path="/silverport/writing">
    <Writing />
  </Route>
  <Route exact path="/silverport/contact">
    <Contact />
  </Route>
  <Route exact path="/silverport/work">
    <Work />
  </Route> */}
        <Route>
          <div>404 error</div>
        </Route>
      </Switch>
    );
  };
  return (
    <div>
      {" "}
      <UserContext.Provider value={{ state, dispatch }}>
        <div className="App">
          <div className="navsticky">
            <Navbar />
          </div>
          <div>
            <Routing />
          </div>
        </div>{" "}
      </UserContext.Provider>
    </div>
  );
};

export default Maker;
