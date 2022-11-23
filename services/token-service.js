/**
 * @module services/token
 * @requires jsonwebtoken
 */
const jwt = require("jsonwebtoken");
const TokenModel = require("../models/token-model");

/**
 * TokenService
 * @type {object}
 * @constructor
 * @namespace TokenService
 */
class TokenService {
  /**
   * @name generateToken
   * @memberof module:services/token
   * @function
   * @param {*} payload data, which will encrypt
   * @returns {Object<{accessToken: string, refreshToken: string}>} pair of tokens
   */
  generateToken(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "2h",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "15d",
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  /**
   * @name validateAccessToken
   * @memberof module:services/token
   * @function
   * @param {string} token access token
   * @returns {Object}  data which was ecrypt in jwt tokens
   */
  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }

  /**
   * @name validateRefreshToken
   * @memberof module:services/token
   * @function
   * @param {string} token refresh token
   * @returns {Object}  data which was ecrypt in jwt tokens
   */
  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }

  /**
   * @name validateRefreshToken
   * @memberof module:services/token
   * @function
   * @param {string} userId
   * @param {string} refreshToken refresh token
   * @returns {Object}   refresh token
   */
  async saveToken(userId, refreshToken) {
    const tokenData = await TokenModel.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await TokenModel.create({ user: userId, refreshToken });
    return token;
  }

  /**
   * @name removeToken
   * @memberof module:services/token
   * @function
   * @param {string} refreshToken refresh token
   * @returns {Object}  object from userID and refreshToken
   */
  async removeToken(refreshToken) {
    const tokenData = await TokenModel.deleteOne({ refreshToken });
    return tokenData;
  }

  /**
   * @name findToken
   * @memberof module:services/token
   * @function
   * @param {string} refreshToken refresh token
   * @returns {Object}  object from userID and refreshToken
   */
  async findToken(refreshToken) {
    const tokenData = await TokenModel.findOne({ refreshToken });
    return tokenData;
  }
}

module.exports = new TokenService();
