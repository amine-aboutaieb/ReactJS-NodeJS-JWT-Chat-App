import React, { useContext, useEffect } from "react";
import StateContext from "./StateContext";
import { Redirect } from "react-router-dom";

function Logout() {
  const { globalState, dispatch } = useContext(StateContext);
  const { isLogedIn } = globalState;
  let redirect = null;
  useEffect(() => {
    if (isLogedIn) {
      localStorage.clear();
      dispatch({ type: "clearState" });
      redirect = <Redirect to="/login" />;
    } else {
      redirect = <Redirect to="/app" />;
    }
  }, []);

  return redirect;
}

export default Logout;
