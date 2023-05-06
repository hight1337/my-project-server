const Router = require("express").Router;
const userController = require("../controllers/user");
const router = new Router();
const { body } = require("express-validator");

// VALIDATIONS
const { signUpValidation } = require("../middlewares/validation");

// AUTH
router.post("/auth/sign-up", signUpValidation, userController.signUp);

router.post("/auth/sign-in", body("email").isEmail().notEmpty());

router.post("/auth/sign-out");

router.get("/auth/activate/:link");
router.get("/auth/refresh");

// POSTS
// Logic here...
module.exports = router;
