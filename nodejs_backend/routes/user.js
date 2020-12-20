const router = require("express").Router();
const verify = require("../middlewares/jwtVerifiy");
const UserController = require("../controllers/user");

router.post("/register", (req, res) => {
  UserController.register(req, res);
});

router.post("/login", (req, res) => {
  UserController.login(req, res);
});

router.post("/state/data", verify, (req, res) => {
  console.log(req.userData);
  res.status(200).json({ ...req.userData });
});

module.exports = router;
