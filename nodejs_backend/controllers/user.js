const UserModel = require("../models/user");
const jwt = require("jsonwebtoken");
const jwt_secret = require("config").get("jwt_secret");

module.exports = {
  register: (req, res) => {
    let data = req.body;
    if (
      data.firstName !== "" &&
      data.lastName !== "" &&
      data.email !== "" &&
      data.pwd !== "" &&
      data.username !== ""
    ) {
      UserModel.checkAccountRegister(data.email, data.username)
        .then(({ num }) => {
          if (num === 0) {
            UserModel.register(data)
              .then(() => {
                res
                  .status(200)
                  .json({ message: "Account registered successfully" });
              })
              .catch((error) => {
                res.status(500).json({ message: "Internal server error" });
              });
          } else {
            res.status(400).json({ message: "This account already exists" });
          }
        })
        .catch((error) => {
          console.log(error);
          res.status(500).json({ message: "Internal server error" });
        });
    } else {
      res.status(400).json({ message: "Insufficient registration data" });
    }
  },
  login: (req, res) => {
    let data = req.body;
    if (data.email !== "" && data.pwd !== "") {
      UserModel.login(data)
        .then((result) => {
          if (result === undefined) {
            res.status(400).json({ message: "Invalid authentication data" });
          } else {
            let { id, firstName, lastName, email, username } = result;

            jwt.sign(
              { id, firstName, lastName, email, username },
              jwt_secret,
              (error, token) => {
                if (error) {
                  res.status(500).json({ message: "Internal server error" });
                } else {
                  res.status(200).json({
                    message: "Account authenticated successfully",
                    token: token,
                    firstName,
                    lastName,
                    email,
                    username,
                  });
                }
              }
            );
          }
        })
        .catch((error) => {
          console.log(error);
          res.status(500).json({ message: "Internal server error" });
        });
    } else {
      res.status(400).json({ message: "Insufficient authentication data" });
    }
  },
  searchForUsers: (req, res) => {
    UserModel.searchForUsers(req.query.str)
      .then((result) => {
        res.status(200).json({ message: "user search matches", users: result });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
      });
  },
  getProfileData: (req, res) => {
    let username = req.query.username;
    console.log(username);
    if (username !== "") {
      UserModel.getProfileData(username, req.userData.id)
        .then((result) => {
          res.status(200).json({ message: "profile data", payload: result });
        })
        .catch((error) => {
          console.log(error);
          res.status(500).json({ message: "Internal server error" });
        });
    }
  },
  followUser: (req, res) => {
    let { id } = req.body;
    UserModel.followUser(req.userData.id, id)
      .then(() => {
        res.status(200).json({ message: "user followed" });
      })
      .catch((error) => {
        console.log(error);
      });
  },
  unFollowUser: (req, res) => {
    let { id } = req.body;
    UserModel.unFollowUser(req.userData.id, id)
      .then(() => {
        res.status(200).json({ message: "user unfollowed" });
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
