/**Schema of mongoDB for file
 * @module models/file
 * @requires mongoose
 */

const { Schema, model } = require("mongoose");

const fileModel = new Schema({
  name: { type: String, require: true },
  path: { type: String, require: true },
  type: { type: String, require: true },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = model("File", fileModel);
