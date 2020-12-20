import React, { useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Error from "./Error";
import NavBar from "./NavBar";
import ChatApp from "./ChatApp";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import StateContext from "./StateContext";
import StateReducer from "./StateReducer";
import Logout from "./Logout";

function App() {
  useEffect(() => {
    if (localStorage.getItem("auth_token") !== null) {
      axios
        .post("api/user/state/data")
        .then((response) => {
          const { firstName, lastName, email } = response.data;
          dispatch({ type: "setStateData", firstName, lastName, email });
        })
        .catch((error) => {
          console.log(localStorage.getItem("auth_token"));
          localStorage.clear();
          dispatch({ type: "clearState" });
        });
    }
  }, []);

  const [globalState, dispatch] = StateReducer();

  return (
    <div>
      <BrowserRouter>
        <StateContext.Provider value={{ globalState, dispatch }}>
          <NavBar />
          <Switch>
            <Route exact path="/" component={Home} />
            <PublicRoute path="/register" component={Register} />
            <PublicRoute path="/login" component={Login} />
            <ProtectedRoute path="/app" component={ChatApp} />
            <ProtectedRoute path="/logout" component={Logout} />
            <Route path="/" component={Error} />
          </Switch>
        </StateContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
