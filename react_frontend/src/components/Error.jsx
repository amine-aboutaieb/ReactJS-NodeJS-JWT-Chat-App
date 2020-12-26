import React from "react";

function Error({ location }) {
  return (
    <div id="error404">
      <h1>Error 404</h1>
      <h2>{location.pathname} not found</h2>
    </div>
  );
}

export default Error;
