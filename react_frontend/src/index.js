import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import axios from "axios";
import API from "./components/AxiosInstance";

API.interceptors.request.use(
  (config) => {
    config.headers["x-authentication-token"] = localStorage.getItem(
      "auth_token"
    );
    console.log(config.headers["x-authentication-token"]);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

ReactDOM.render(<App />, document.getElementById("root"));
