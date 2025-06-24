const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js");

//signUp get and post
router.route("/signup")
.get(userController.renderSignup)
.post( wrapAsync(userController.signUp)); 

//logIn get and post
router.route("/login")
.get(userController.renderLogin)
.post(saveRedirectUrl,
  passport.authenticate("local",{ // passport.authenticate cheack the user is exit in database or not
  failureRedirect: "/login",
  failureFlash: true,
}),userController.logIn);

//LOGOUT
router.get("/logout",userController.logOut);

module.exports = router;