import React, { useContext, useState } from "react";
import StateContext from "./StateContext";

function LogedInData() {
  const { globalState } = useContext(StateContext);
  const [dataShow, setDataShow] = useState(false);
  const { email, firstName, lastName, username, isLogedIn } = globalState;
  return (
    isLogedIn && (
      <div>
        <h1
          id="logedInTitle"
          onMouseOver={() => {
            setDataShow(true);
          }}
          onMouseOut={() => {
            setDataShow(false);
          }}
        >
          {username}
        </h1>
        {dataShow && (
          <div id="logedInDataContainer">
            <p>
              {firstName} {lastName}
            </p>
            <p>{email}</p>
          </div>
        )}
      </div>
    )
  );
}

export default LogedInData;
