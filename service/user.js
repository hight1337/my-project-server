const UserModel = require("../models/user");
const bcrypt = require("bcrypt");
const uuid = require("uuid");

const tokenService = require("./token");

const UserDto = require("../dtos/user");

class UserService {
  async signUp(email, password, firstName, lastName) {
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      return next(ApiError.BadRequest("User with this email already exists"));
    }

    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();

    const user = await UserModel.create({
      email,
      password: hashPassword,
      firstName,
      lastName,
      activationLink,
    });

    // TODO: Send email with activation link

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
