import React from "react";
import { Redirect, Route } from "react-router-dom";

function ProtectedRoute({ component, path }) {
  if (localStorage.getItem("auth_token") === null) {
    return <Redirect to="/login" />;
  } else {
    return <Route exact path={path} component={component} />;
  }
}

export default ProtectedRoute;
