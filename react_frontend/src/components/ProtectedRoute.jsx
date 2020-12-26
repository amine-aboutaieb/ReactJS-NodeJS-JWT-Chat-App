import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import stateContext from "./StateContext";

function ProtectedRoute({ component, path, location }) {
  const { globalState } = useContext(stateContext);
  const { isLogedIn } = globalState;
  if (isLogedIn) {
    return <Route exact path={path} component={component} />;
  } else {
    return (
      <Redirect
        to={{ pathname: "/login", state: { pathname: location.pathname } }}
      />
    );
  }
}

export default ProtectedRoute;
