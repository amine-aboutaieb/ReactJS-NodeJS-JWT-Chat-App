import React, { useContext } from "react";
import stateContext from "./StateContext";

function ChatApp() {
  const { globalState } = useContext(stateContext);
  const { firstName, lastName, email, username } = globalState;
  return (
    <div>
      <h1>Chat App</h1>
      <p>Email : {email}</p>
      <p>Username : {username}</p>
      <p>First Name : {firstName}</p>
      <p>Last Name : {lastName}</p>
    </div>
  );
}

export default ChatApp;
