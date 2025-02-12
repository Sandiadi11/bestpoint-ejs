const experss = require("express");
const router = experss.Router();
const passport = require("passport");
const User = require("../models/user");
const AuthController = require("../controllers/auth");
const wrapAsync = require("../utils/wrapAsync");

router
  .route("/register")
  .get(AuthController.registerForm)
  .post(wrapAsync(AuthController.register));

router
  .route("/login")
  .get(AuthController.loginForm)
  .post(
    passport.authenticate("local", {
      failureFlash: {
        type: "error",
        message: "Invalid username or password",
      },
      failureRedirect: "/login",
    }),
    AuthController.login
  );

router.post("/logout", AuthController.logout);

module.exports = router;
