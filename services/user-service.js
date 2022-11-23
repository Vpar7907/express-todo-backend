/**
 * @module services/user
 * @requires bcrypt
 * @requires uuid
 */
const UserModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const TokenService = require("./token-service");
const UserDto = require("../dtos/user-dto");
const ApiError = require("../exceptions/api-error");

/**
 * UserService
 * @type {object}
 * @constructor
 * @namespace UserService
 */
class UserService {
  /**
   * User service that add new user.
   * @name registration
   * @memberof module:services/user
   * @function
   * @async
   * @param {string} email request
   * @param {string} password response
   * @return {Promise<{user: {email: string, id: string}, accessToken: string, refreshToken: string}>} return user data and pair of token
   */
  async registration(email, password) {
    const candidate = await UserModel.findOne({ email });
    if (candidate != null) {
      throw ApiError.BadRequest(
        `Пользователь с почтовым адрессом ${email} уже существует.`
      );
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();

    const user = await UserModel.create({
      email,
      password: hashPassword,
      activationLink,
    });
    const userDto = new UserDto(user);
    const tokens = TokenService.generateToken({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  /**
   * User service that login user in service, take in body of request email(string) and password(string).
   * @name login
   * @memberof module:services/user
   * @function
   * @async
   * @param {string} email request
   * @param {string} password response
   * @return {Promise<{user: {email: string, id: string}, accessToken: string, refreshToken: string}>} return user data and pair of token
   */
  async login(email, password) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest(`Пользователь с email ${email} не существует.`);
    }
    const isPasswordEquals = await bcrypt.compare(password, user.password);
    if (!isPasswordEquals) {
      throw ApiError.BadRequest("Неверный пароль");
    }
    const userDto = new UserDto(user);
    const tokens = TokenService.generateToken({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }

  /**
   * User service that loggout from service.
   * @name logout
   * @memberof module:services/user
   * @function
   * @async
   * @param {string} refreshToken from cookies
   * @return {Promise} delete refreshToken from cookies
   */
  async logout(refreshToken) {
    const token = await TokenService.removeToken(refreshToken);
    return token;
  }

  /**
   * User service that loggout from service.
   * @name refresh
   * @memberof module:services/user
   * @function
   * @async
   * @param {string} refreshToken from cookies
   * @return {Promise<{user: {email: string, id: string}, accessToken: string, refreshToken: string}>} return user data and pair of token
   */
  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnathorizedError();
    }
    const userData = TokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await TokenService.findToken(refreshToken);
    if (!userData && !tokenFromDb) {
      throw ApiError.UnathorizedError();
    }
    const user = await UserModel.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = TokenService.generateToken({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }
}

module.exports = new UserService();
