const UserModel = require("../models/user");
const bcrypt = require("bcrypt");

const tokenService = require("./token");

const UserDto = require("../dtos/user");
const ApiError = require("../exceptions/api-error");

class UserService {
  async signUp(email, password, firstName, lastName) {
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw ApiError.BadRequest(`User with email ${email} already exists`);
    }

    const hashPassword = await bcrypt.hash(password, 3);

    const user = await UserModel.create({
      email,
      password: hashPassword,
      firstName,
      lastName,
    });

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async signIn(email, password) {}

  async signOut() {}

  async activate(activationLink) {}

  async refresh(refreshToken) {}
}

module.exports = new UserService();
