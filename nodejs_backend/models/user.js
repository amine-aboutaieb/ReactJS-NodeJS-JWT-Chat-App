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
};
