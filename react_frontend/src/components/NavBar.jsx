import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import stateContext from "./StateContext";
import LogedInData from "./LogedInData";

function NavBar() {
  const { globalState, dispatch } = useContext(stateContext);
  const { isLogedIn } = globalState;

  return (
    <nav>
      <LogedInData />
      {/* <NavLink exact to="/" activeClassName="active">
        Home
      </NavLink> */}

      {isLogedIn ? (
        <>
          <NavLink exact to="/app" activeClassName="active">
            App
          </NavLink>
          <NavLink exact to="/search" activeClassName="active">
            Search for friends
          </NavLink>

          <NavLink exact to="/logout">
            Logout
          </NavLink>
        </>
      ) : (
        <>
          <NavLink exact to="/register" activeClassName="active">
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
