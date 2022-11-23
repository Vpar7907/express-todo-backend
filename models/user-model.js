/**Schema of mongoDB for user
 * @module models/user
 * @requires mongoose
 */
const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

module.exports = model("User", UserSchema);
