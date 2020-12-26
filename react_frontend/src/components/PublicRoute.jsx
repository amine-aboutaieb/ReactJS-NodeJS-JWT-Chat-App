import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import StateContext from "./StateContext";

function PublicRoute(props) {
  const { globalState } = useContext(StateContext);
  const { isLogedIn } = globalState;
  if (!isLogedIn) {
    return <Route exact path={props.path} component={props.component} />;
  } else {
    return <Redirect to={{ pathname: props.location.state.pathname }} />;
  }
}

export default PublicRoute;
