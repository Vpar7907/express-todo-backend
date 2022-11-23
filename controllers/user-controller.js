/**
 * @module controller/user
 */
const UserService = require("../services/user-service");
const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api-error");

/**
 * UserController
 * @type {object}
 * @constructor
 * @namespace UserController
 */
class UserController {
  /**
   * User controller that add new user, take in body of request email(string) and password(string).
   * @name registration
   * @memberof module:controller/user
   * @function
   * @async
   * @param {Object} req request
   * @param {Object} res response
   * @param {Object} next next
   * @return {Promise<{user: {email: string, id: string}, accessToken: string, refreshToken: string}>} return user data and pair of token
   */
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest("Ошибка при валидации", errors.array())
        );
      }
      const { email, password } = req.body;
      const userData = await UserService.registration(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  /**
   * User controller that login user in service, take in body of request email(string) and password(string).
   * @name login
   * @memberof module:controller/user
   * @function
   * @async
   * @param {Object} req request
   * @param {Object} res response
   * @param {Object} next next
   * @return {Promise<{user: {email: string, id: string}, accessToken: string, refreshToken: string}>} return user data and pair of token
   */
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await UserService.login(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  /**
   * User controller that loggout from service, take in body of request.
   * @name logout
   * @memberof module:controller/user
   * @function
   * @async
   * @param {Object} req request
   * @param {Object} res response
   * @param {Object} next next
   * @return {Promise} delete refreshToken from cookies
   */
  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await UserService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(token);
    } catch (e) {
      next(e);
    }
  }

  /**
   * User controller that loggout from service.
   * @name refresh
   * @memberof module:controller/user
   * @function
   * @async
   * @param {Object} req request
   * @param {Object} res response
   * @param {Object} next next
   * @return {Promise<{user: {email: string, id: string}, accessToken: string, refreshToken: string}>} return user data and pair of token
   */
  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await UserService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();
