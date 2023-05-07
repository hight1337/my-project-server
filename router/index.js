const Router = require("express").Router;
const userController = require("../controllers/user");
const router = new Router();
const { body } = require("express-validator");

// VALIDATIONS
const {
  signUpValidation,
  signInValidation,
} = require("../middlewares/validation");

// AUTH
router.post("/auth/sign-up", signUpValidation, userController.signUp);

router.post("/auth/sign-in", signInValidation, userController.signIn);

router.post("/auth/sign-out", userController.signOut);

router.get("/auth/refresh", userController.refresh);

// POSTS
// Logic here...
module.exports = router;
