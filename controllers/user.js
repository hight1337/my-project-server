const userService = require("../service/user");
const { validationResult } = require("express-validator");

const ApiError = require("../exceptions/api-error");

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

  async signIn(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.signIn(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async signOut(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      await userService.signOut(refreshToken);
      res.clearCookie("refreshToken");
      return res.json({
        message: "You have successfully logged out",
      });
    } catch (error) {
      next(error);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async getMe(req, res, next) {
    try {
      const userId = req.user.id;
      const user = await userService.getUserById(userId);
      return res.json(user);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
