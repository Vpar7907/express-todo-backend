/**
 * @module services/file
 */
const fileModel = require("../models/file-model");

/**
 * FileService
 * @type {object}
 * @constructor
 * @namespace FileService
 */
class FileService {
  /**
   * Upload service serving file uploads on server, take in args filename, file, user.
   * @name upload
   * @memberof module:services/file
   * @function
   * @async
   * @param {object} file object from multer
   * @param {string} name name from req.body
   * @param {string} user user from req.user
   * @return {Promise<{name: string, path: string, user: string}>} return file
   */
  async upload(file, name, user) {
    const type = file.mimetype.split("/")[0];
    const path = `/static/${type}/${file.filename}`;
    const fileDb = await fileModel.create({ name, path, type, user: user.id });
    return fileDb;
  }
}

module.exports = new FileService();
