/**
 * @module routes/auth
 * @requires express
 * @requires express-validator
 */

const express = require("express");
const UserController = require("../controllers/user-controller");
const { body } = require("express-validator");

/**
 * Express router to mount authentication related functions on.
 * @type {object}
 * @const
 * @namespace authRouter
 */
const router = new express.Router();

/**
 * Route serving registration form.
 * @name POST:/auth/registration
 * @function
 * @memberof module:routes/auth~authRouter
 * @param {string} path - http//:API_URL/api/auth/registration
 * @param {callback} middleware - validation middleware for email
 * @param {callback} middleware - validation middleware for password
 * @param {callback} controller - authController.registration
 */
router.post(
  "/auth/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 8, max: 32 }),
  UserController.registration
);

/**
 * Route serving login form.
 * @name POST:/auth/login
 * @function
 * @memberof module:routes/auth~authRouter
 * @param {string} path - http//:API_URL/api/auth/login
 * @param {callback} controller - authController.login
 */
router.post("/auth/login", UserController.login);

/**
 * Route serving loggout form.
 * @name POST:/auth/logout
 * @function
 * @memberof module:routes/auth~authRouter
 * @param {string} path - http//:API_URL/api/auth/logout
 * @param {callback} controller - authController.logout
 */
router.post("/auth/logout", UserController.logout);

/**
 * Route serving access and refresh token.
 * @name POST:/auth/refresh
 * @function
 * @memberof module:routes/auth~authRouter
 * @param {string} path - http//:API_URL/api/auth/refresh
 * @param {callback} controller - authController.refresh
 */
router.get("/auth/refresh", UserController.refresh);

module.exports = router;
