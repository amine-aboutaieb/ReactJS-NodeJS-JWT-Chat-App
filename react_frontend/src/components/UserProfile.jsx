import React, { useEffect, useState, useContext } from "react";
import API from "./AxiosInstance";
import StateContext from "./StateContext";

function UserProfile(props) {
  const { globalState, dispatch } = useContext(StateContext);
  const [userData, setUserData] = useState({
    data: {
      id: null,
      firstName: null,
      lastName: null,
      email: null,
      username: null,
    },
    followed: null,
  });
  useEffect(() => {
    let username = props.match.params.username;
    if (globalState.username !== username) {
      API.get("/api/user/profile/data", {
        method: "GET",
        params: {
          username,
        },
      })
        .then((response) => {
          setUserData(response.data.payload);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      props.history.push("/search");
    }
  }, []);

  const handleFollowUser = () => {
    API.post("/api/user/profile/follow", {
      id: userData.data.id,
    })
      .then((response) => {
        setUserData({ data: userData.data, followed: 1 });
      })
      .catch((error) => {
        console.log(error);
        localStorage.clear();
        dispatch({ type: "clearState" });
      });
  };

  const handleUnfollowUser = () => {
    API.post("/api/user/profile/unfollow", {
      id: userData.data.id,
    })
      .then((response) => {
        console.log(response);
        setUserData({ data: userData.data, followed: 0 });
      })
      .catch((error) => {
        console.log(error);
        localStorage.clear();
        dispatch({ type: "clearState" });
      });
  };

  return (
    <div id="userProfile">
      <h1>
        <span id="profileNameSpan">{userData.data.username}'s</span> profile
      </h1>
      {userData.followed === 0 ? (
        <button className="profileFollowBtns" onClick={handleFollowUser}>
          Follow
        </button>
      ) : (
        <button className="profileFollowBtns" onClick={handleUnfollowUser}>
          Unfollow
        </button>
      )}
    </div>
  );
}

export default UserProfile;
