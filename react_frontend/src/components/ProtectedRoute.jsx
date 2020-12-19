import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import stateContext from "./StateContext";

function ProtectedRoute({ component, path }) {
  const { globalState } = useContext(stateContext);
  const { isLogedIn } = globalState;
  if (!isLogedIn) {
    return <Redirect to="/login" />;
  } else {
    return <Route exact path={path} component={component} />;
  }
}

export default ProtectedRoute;
