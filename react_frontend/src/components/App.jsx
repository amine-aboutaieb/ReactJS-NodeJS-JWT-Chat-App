import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Error from "./Error";
import NavBar from "./NavBar";
import ChatApp from "./ChatApp";
import ProtectedRoute from "./ProtectedRoute";
import StateContext from "./StateContext";
import StateReducer from "./StateReducer";

function App() {
  const [globalState, dispatch] = StateReducer();

  return (
    <div>
      <BrowserRouter>
        <StateContext.Provider value={{ globalState, dispatch }}>
          <NavBar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <ProtectedRoute path="/app" component={ChatApp} />
            <Route path="/" component={Error} />
          </Switch>
        </StateContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
