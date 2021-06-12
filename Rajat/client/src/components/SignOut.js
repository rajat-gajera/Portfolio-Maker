import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../components/Maker";
const SignOut = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  useEffect(() => {
    fetch("/signout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        dispatch({ type: "USER", payload: false });
        history.push("/signin", { replace: true });
        if (res.status !== 200) {
          const error = new Error(res.error);
          throw error;
        }
        window.alert(res.message);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return <div></div>;
};

export default SignOut;
