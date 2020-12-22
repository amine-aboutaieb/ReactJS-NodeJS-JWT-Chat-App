import React, { useReducer } from "react";

function reducer(state, action) {
  const { type } = action;
  if (type === "setStateData") {
    const { firstName, lastName, email, username } = action;
    return {
      ...state,
      firstName,
      lastName,
      email,
      username: username,
      isLogedIn: true,
    };
  } else if (type === "clearState") {
    return {
      firstName: null,
      lastName: null,
      email: null,
      username: null,
      isLogedIn: false,
    };
  }
}

function StateReducer() {
  const [state, dispatch] = useReducer(reducer, {
    email: null,
    firstName: null,
    lastName: null,
    username: null,
    isLogedIn: false,
  });

  return [state, dispatch];
}

export default StateReducer;
