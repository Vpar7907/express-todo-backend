/**Middlewares for upload file on server in directory 'static'
 * @module middlewares/upload-middleware
 * @requires fs
 * @requires path
 * @requires multer
 * @requires uuid
 */
const multer = require("multer");
const uuid = require("uuid");

const fs = require("fs");
const { resolve } = require("path");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    const path = resolve(
      __dirname,
      "..",
      "static",
      file.mimetype.split("/")[0]
    );
    fs.mkdirSync(path, { recursive: true });
    return cb(null, path);
  },
  filename(req, file, cb) {
    cb(null, `${uuid.v4()}.${file.originalname.split(".")[1]}`);
  },
});

module.exports = multer({
  storage,
});
