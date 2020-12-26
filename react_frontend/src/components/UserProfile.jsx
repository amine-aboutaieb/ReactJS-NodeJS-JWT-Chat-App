import React, { useEffect } from "react";
import API from "./AxiosInstance";

function UserProfile(props) {
  useEffect(() => {
    API.get("/api/user/profile/data", {
      method: "GET",
      params: {
        username: props.match.params.username,
      },
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>{props.match.params.username}'s profile</h1>
    </div>
  );
}

export default UserProfile;
