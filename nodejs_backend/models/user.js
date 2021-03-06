const dbConnection = require("./dbCon").con;

module.exports = {
  checkAccountRegister: (email, username) => {
    return new Promise((resolve, reject) => {
      dbConnection.query(
        `SELECT COUNT(*) AS num FROM users WHERE email LIKE ${dbConnection.escape(
          email
        )} OR username LIKE ${dbConnection.escape(username)}`,
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result[0]);
          }
        }
      );
    });
  },
  register: ({ firstName, lastName, email, pwd, username }) => {
    return new Promise((resolve, reject) => {
      dbConnection.query(
        `INSERT INTO users VALUES(NULL, ${dbConnection.escape(
          firstName
        )}, ${dbConnection.escape(lastName)}, ${dbConnection.escape(
          email
        )}, ${dbConnection.escape(pwd)}, ${dbConnection.escape(username)});`,
        (error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        }
      );
    });
  },
  login: ({ email, pwd }) => {
    return new Promise((resolve, reject) => {
      dbConnection.query(
        `SELECT * FROM users WHERE email LIKE ${dbConnection.escape(
          email
        )} AND pwd LIKE ${dbConnection.escape(pwd)};`,
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result[0]);
          }
        }
      );
    });
  },
  searchForUsers: (str) => {
    return new Promise((resolve, reject) => {
      let searchStr = dbConnection.escape("%" + str + "%");
      dbConnection.query(
        `SELECT id, firstName, lastName, username FROM users WHERE firstName LIKE ${searchStr} OR lastName LIKE ${searchStr} OR username LIKE ${searchStr};`,
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
    });
  },
  getProfileData: (userName, id) => {
    return new Promise((resolve, reject) => {
      let username = dbConnection.escape(userName);
      dbConnection.query(
        `SELECT id, firstName, lastName, email, username FROM users WHERE username LIKE ${username}`,
        (error, result1) => {
          if (error) {
            reject(error);
          } else {
            if (result1.length > 0) {
              dbConnection.query(
                `SELECT COUNT(*) AS num FROM follows WHERE follower = ${id} AND followed = ${result1[0].id}`,
                (error, result2) => {
                  if (error) {
                    reject(error);
                  } else {
                    resolve({ data: result1[0], followed: result2[0].num });
                  }
                }
              );
            } else {
              reject("empty");
            }
          }
        }
      );
    });
  },
  followUser: (follower, followed) => {
    return new Promise((resolve, reject) => {
      dbConnection.query(
        `SELECT COUNT(*) AS NUM FROM follows WHERE follower = ${parseInt(
          dbConnection.escape(follower)
        )} AND followed = ${parseInt(dbConnection.escape(followed))};`,
        (error, result1) => {
          if (error) {
            reject(error);
          } else {
            if (result1[0].NUM === 0) {
              dbConnection.query(
                `INSERT INTO follows VALUES(NULL, ${parseInt(
                  dbConnection.escape(follower)
                )}, ${parseInt(dbConnection.escape(followed))}, NOW());`,
                (error) => {
                  if (error) {
                    reject(error);
                  } else {
                    resolve();
                  }
                }
              );
            } else {
              reject("already followed");
            }
          }
        }
      );
    });
  },
  unFollowUser: (follower, followed) => {
    return new Promise((resolve, reject) => {
      dbConnection.query(
        `SELECT COUNT(*) AS NUM FROM follows WHERE follower = ${parseInt(
          dbConnection.escape(follower)
        )} AND followed = ${parseInt(dbConnection.escape(followed))};`,
        (error, result1) => {
          if (error) {
            reject(error);
          } else {
            if (result1[0].NUM !== 0) {
              dbConnection.query(
                `DELETE FROM follows WHERE follower = ${parseInt(
                  dbConnection.escape(follower)
                )} AND followed = ${parseInt(dbConnection.escape(followed))};`,
                (error) => {
                  if (error) {
                    reject(error);
                  } else {
                    resolve();
                  }
                }
              );
            } else {
              reject("not followed");
            }
          }
        }
      );
    });
  },
};
