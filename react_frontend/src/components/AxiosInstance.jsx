import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5500/",
  headers: {
    "x-authentication-token": localStorage.getItem("auth_token"),
  },
});

export default instance;
