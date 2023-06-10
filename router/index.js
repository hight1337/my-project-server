const Router = require("express").Router;
const userController = require("../controllers/user");
const postController = require("../controllers/post");
const router = new Router();
const authMiddleware = require("../middlewares/auth-middleware");
// VALIDATIONS
const {
  signUpValidation,
  signInValidation,
} = require("../middlewares/validation");

// AUTH
router.post("/auth/sign-up", signUpValidation, userController.signUp);

router.post("/auth/sign-in", signInValidation, userController.signIn);

router.post("/sign-out", userController.signOut);

router.get("/refresh", userController.refresh);

// USER
router.get("/me", authMiddleware, userController.getMe);

// POSTS
router.post("/posts", authMiddleware, postController.createPost);
router.get("/posts", authMiddleware, postController.getAll);
router.get("/posts/:id", authMiddleware, postController.getPostById);
router.get("/posts/my", authMiddleware, postController.getUsersPosts);
router.patch("/posts/:id", authMiddleware, postController.updatePost);
router.delete("/posts/:id", authMiddleware, postController.deletePost);

module.exports = router;
