const router = require("express").Router();
const verify = require("../middlewares/jwtVerifiy");
const UserController = require("../controllers/user");

router.post("/register", (req, res) => {
  console.log(req.body);
  UserController.register(req, res);
});

router.post("/login", (req, res) => {
  UserController.login(req, res);
});

router.post("/state/data", verify, (req, res) => {
  res.status(200).json({ ...req.userData });
});

router.get("/search", verify, (req, res) => {
  UserController.searchForUsers(req, res);
});

router.get("/profile/data", verify, (req, res) => {
  UserController.getProfileData(req, res);
});

module.exports = router;
