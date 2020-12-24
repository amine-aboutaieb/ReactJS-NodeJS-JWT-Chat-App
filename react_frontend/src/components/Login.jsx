import React, { useState, useContext } from "react";
import axios from "axios";
import stateContext from "./StateContext";
import API from "./AxiosInstance";

function Login({ history }) {
  const [loginState, setLoginState] = useState({ email: null, pwd: null });
  const { globalState, dispatch } = useContext(stateContext);

  const handleLogin = (e) => {
    e.preventDefault();
    const { email, pwd } = loginState;
    if (email !== null && pwd !== null) {
      API.post("api/user/login", {
        email,
        pwd,
      })
        .then((response) => {
          const {
            token,
            message,
            firstName,
            lastName,
            email,
            username,
          } = response.data;
          alert(message);
          localStorage.setItem("auth_token", token);
          dispatch({
            type: "setStateData",
            firstName,
            lastName,
            email,
            username,
          });
          history.push("/app");
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    } else {
      alert("Please fill all the registration fields");
    }
  };

  return (
    <form action="/login" method="post" id="loginForm">
      <input
        type="email"
        name="email"
        placeholder="Email..."
        onChange={(e) => {
          setLoginState({ ...loginState, email: e.target.value });
        }}
      />
      <input
        type="text"
        name="pwd"
        placeholder="Password..."
        onChange={(e) => {
          setLoginState({ ...loginState, pwd: e.target.value });
        }}
      />
      <button onClick={handleLogin}>Login</button>
    </form>
  );
}

export default Login;
