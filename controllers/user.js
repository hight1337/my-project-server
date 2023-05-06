const userService = require("../service/user");
const { validationResult } = require("express-validator");

class UserController {
  async signUp(req, res, next) {
    try {
      const validationErrors = validationResult(req);
      if (!validationErrors.isEmpty()) {
        return next(
          ApiError.BadRequest("Validation error", validationErrors.array())
        );
      }
      const { email, password, firstName, lastName } = req.body;
      const userData = await userService.signUp(
        email,
        password,
        firstName,
        lastName
      );
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
