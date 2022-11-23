/**
 * @module controller/upload
 */
const FileService = require("../services/file-service");

/**
 * FileController
 * @type {object}
 * @constructor
 * @namespace FileController
 */

class FileController {
  /**
   * Upload controller serving file uploads on server, take in body of request filename and file.
   * @name upload
   * @memberof module:controller/upload
   * @function
   * @async
   * @param {Object} req request
   * @param {Object} res response
   * @param {Object} next next
   * @return {Promise<{name: string, path: string, user: string}>} return file
   */
  async upload(req, res, next) {
    try {
      const { name } = req.body;
      const { file, user } = req;
      const fileDb = await FileService.upload(file, name, user);
      res.json(fileDb);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new FileController();
