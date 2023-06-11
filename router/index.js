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
router.post("/sign-up", signUpValidation, userController.signUp);
router.post("/sign-in", signInValidation, userController.signIn);
router.post("/sign-out", userController.signOut);
router.get("/refresh", userController.refresh);

// USER
router.get("/me", authMiddleware, userController.getMe);

// POSTS
router.post("/post/create", authMiddleware, postController.createPost);
router.get("/posts", authMiddleware, postController.getAll);
router.get("/post/:id", authMiddleware, postController.getPostById);
router.get("/my/posts", authMiddleware, postController.getUsersPosts);
router.patch("/post/update/:id", authMiddleware, postController.updatePost);
router.delete("/post/delete/:id", authMiddleware, postController.deletePost);

module.exports = router;
