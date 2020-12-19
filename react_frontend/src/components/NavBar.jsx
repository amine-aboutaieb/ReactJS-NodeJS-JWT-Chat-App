import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import stateContext from "./StateContext";

function NavBar() {
  const { globalState, dispatch } = useContext(stateContext);
  const { isLogedIn } = globalState;

  return (
    <nav>
      <NavLink exact to="/">
        Home
      </NavLink>
      {isLogedIn ? (
        <NavLink exact to="/app">
          App
        </NavLink>
      ) : (
        <>
          <NavLink exact to="/register">
            Register
          </NavLink>
          <NavLink exact to="/login">
            Login
          </NavLink>
        </>
      )}
    </nav>
  );
}

export default NavBar;
