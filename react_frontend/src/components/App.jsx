import React, { useEffect } from "react";
import "../index.css";
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
import SearchForFriends from "./SearchForFriends";
import API from "./AxiosInstance";
import UserProfile from "./UserProfile";

function App() {
  useEffect(() => {
    if (localStorage.getItem("auth_token") !== null) {
      API.post("api/user/state/data")
        .then((response) => {
          const { firstName, lastName, email, username } = response.data;
          dispatch({
            type: "setStateData",
            firstName,
            lastName,
            email,
            username,
          });
        })
        .catch((error) => {
          localStorage.clear();
          dispatch({ type: "clearState" });
        });
    }
  }, []);

  const [globalState, dispatch] = StateReducer();

  return (
    <div id="AppContainer">
      <BrowserRouter>
        <StateContext.Provider value={{ globalState, dispatch }}>
          <NavBar />

          <Switch>
            <ProtectedRoute exact path="/" component={ChatApp} />
            <PublicRoute path="/register" component={Register} />
            <PublicRoute path="/login" component={Login} />
            <ProtectedRoute path="/app" component={ChatApp} />
            <ProtectedRoute path="/search" component={SearchForFriends} />
            <ProtectedRoute path="/user/:username" component={UserProfile} />
            <ProtectedRoute path="/logout" component={Logout} />
            <Route path="/" component={Error} />
          </Switch>
        </StateContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
