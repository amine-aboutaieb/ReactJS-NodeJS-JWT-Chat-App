import React, { useState, useContext } from "react";
import axios from "axios";
import StateContext from "./StateContext";
import API from "./AxiosInstance";

function SearchForFriends({ history }) {
  const [usersState, setUsersState] = useState([]);
  const [inputFocus, setInputFocus] = useState(true);
  const { dispatch } = useContext(StateContext);
  const [noDataMsg, setNoDataMsg] = useState(false);
  const handleSearchInput = (e) => {
    setNoDataMsg(false);
    let searchedStr = e.target.value;
    let pattern = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (pattern.test(searchedStr) === false && searchedStr !== "") {
      API.get(`api/user/search`, {
        method: "GET",
        params: { str: searchedStr },
      })
        .then(({ data }) => {
          if (data.users.length > 0) {
            setUsersState(data.users);
          } else {
            setNoDataMsg(true);
            setUsersState([]);
          }
        })
        .catch((error) => {
          localStorage.clear();
          dispatch({ type: "clearState" });
        });
    }
    if (searchedStr === "") {
      setUsersState([]);
    }
  };
  const handleOutOfForm = () => {
    setNoDataMsg(false);
    if (inputFocus) {
      setUsersState([]);
    }
  };
  return (
    <div id="globalSearchContainer">
      <input
        type="text"
        autoComplete="off"
        onChange={handleSearchInput}
        onClick={handleSearchInput}
        id="usersSearchInput"
        onBlur={handleOutOfForm}
        placeholder="Search for your friends..."
      />
      <div id="mainSearchContainer">
        <div id="usersSearchResults">
          {usersState.length > 0 &&
            usersState.map((user, index) => {
              const { id, firstName, lastName, username } = user;
              return (
                <div
                  key={id}
                  onMouseOver={() => {
                    setInputFocus(false);
                  }}
                  onMouseOut={() => {
                    setInputFocus(true);
                  }}
                  onClick={() => {
                    history.push({
                      pathname: `/user/${username}`,
                      state: username,
                    });
                  }}
                >
                  <p>{username}</p>
                  <small>
                    {firstName} {lastName}
                  </small>
                </div>
              );
            })}
          {noDataMsg && <h3 id="noDataMsg">No data found</h3>}
        </div>
      </div>
    </div>
  );
}

export default SearchForFriends;
