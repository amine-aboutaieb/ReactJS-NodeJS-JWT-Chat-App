import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav>
      <NavLink exact to="/">
        Home
      </NavLink>
      {localStorage.getItem("auth_token") ? (
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
