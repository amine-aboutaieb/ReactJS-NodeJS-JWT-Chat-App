import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

function Register({ history }) {
  const [registerState, setRegisterState] = useState({
    firstName: null,
    lastName: null,
    email: null,
    pwd: null,
  });

  const handleRegistration = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, pwd } = registerState;
    if (
      firstName !== null &&
      lastName !== null &&
      email !== null &&
      pwd !== null
    ) {
      axios
        .post("http://localhost:5500/api/user/register", {
          firstName,
          lastName,
          email,
          pwd,
        })
        .then((response) => {
          console.log(response.data);
          alert(response.data.message);

          history.push("/login");
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    } else {
      alert("Please fill all the registration fields");
    }
  };

  return (
    <div>
      <h1>Register Form</h1>
      <form action="/register" method="post">
        <input
          type="text"
          name="firstName"
          placeholder="First Name..."
          onChange={(e) => {
            setRegisterState({ ...registerState, firstName: e.target.value });
          }}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name..."
          onChange={(e) => {
            setRegisterState({ ...registerState, lastName: e.target.value });
          }}
        />
        <input
          type="email"
          name="email"
          placeholder="Email..."
          onChange={(e) => {
            setRegisterState({ ...registerState, email: e.target.value });
          }}
        />
        <input
          type="text"
          name="pwd"
          placeholder="Password..."
          onChange={(e) => {
            setRegisterState({ ...registerState, pwd: e.target.value });
          }}
        />
        <button onClick={handleRegistration}>Create Account</button>
      </form>
    </div>
  );
}

export default Register;
