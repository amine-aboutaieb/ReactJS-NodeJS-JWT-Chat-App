const router = require("express").Router();
const UserController = require("../controllers/user");



router.post("/register", (req, res)=>{
    UserController.register(req, res);
});


router.post("/login", (req, res)=>{
    UserController.login(req, res);
});



module.exports = router;