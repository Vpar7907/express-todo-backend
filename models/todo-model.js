/**Schema of mongoDB for todo
 * @module models/todo
 * @requires mongoose
 */

const { Schema, model } = require("mongoose");

const TodoSchema = new Schema({
  title: { type: String, require: true },
  text: { type: String },
  isComplete: { type: Boolean, default: false },
  userID: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = model("Todo", TodoSchema);
