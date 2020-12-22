const jwt = require("jsonwebtoken");
const jwt_secret = require("config").get("jwt_secret");

function verifiy(req, res, next) {
  let token = req.header("x-authentication-token");
  if (token) {
    jwt.verify(token, jwt_secret, (error, decoded) => {
      if (error) {
        res.status(400).json({ message: "Invalid authentication token" });
      } else {
        req.userData = decoded;
        next();
      }
    });
  } else {
    res.status(400).json({ message: "Missing authentication token" });
  }
}

module.exports = verifiy;
