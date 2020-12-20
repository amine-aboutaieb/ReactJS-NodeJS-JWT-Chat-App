import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import StateContext from "./StateContext";

function PublicRoute({ path, component }) {
  const { globalState } = useContext(StateContext);
  const { isLogedIn } = globalState;
  if (isLogedIn) {
    return <Redirect to="/app" />;
  } else {
    return <Route exact path={path} component={component} />;
  }
}

export default PublicRoute;
