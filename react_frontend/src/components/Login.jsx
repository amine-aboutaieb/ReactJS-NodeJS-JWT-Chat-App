import React from "react";

function Login() {
  return (
    <div>
      <h1>Login</h1>
      <form action="/login" method="post">
        <input type="email" name="email" placeholder="Email..." />
        <input type="text" name="pwd" placeholder="Password..." />
        <button>Login</button>
      </form>
    </div>
  );
}

export default Login;
