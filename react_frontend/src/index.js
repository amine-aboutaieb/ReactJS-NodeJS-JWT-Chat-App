import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:5500/";
axios.defaults.headers.common["x-authentication-token"] = localStorage.getItem("auth_token");


ReactDOM.render(<App />, document.getElementById("root"));