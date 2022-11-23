/**
 * @module routes/uploads
 * @requires express
 */

const express = require("express");
const authMiddleware = require("../middlewares/auth-middleware");
const FileController = require("../controllers/file-controller");
const uploadMiddlware = require("../middlewares/upload-middleware");

/**
 * Express router to mount uploads related functions on.
 * @type {object}
 * @const
 * @namespace uploadsRouter
 */
const router = new express.Router();

/**
 * Route that upload file on server.
 * @name POST:/uploads
 * @function
 * @memberof module:routes/uploads~uploadsRouter
 * @param {string} path - http//:API_URL/api/uplouds
 * @param {callback} middleware - auth middleware
 * @param {callback} middleware - upload middleware
 * @param {callback} controller - FileController.upload
 */
router.post(
  "/uploads",
  authMiddleware,
  uploadMiddlware.single("file"),
  FileController.upload
);

module.exports = router;
