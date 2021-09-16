const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  username: { type: String, unique: true, required: true },
  hash: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  role: { type: String, required: true },
  clientIP: { type: String },
  createdDate: { type: Date, default: Date.now },
  loggedin_Time: { type: Date, default: null },
  loggedout_Time: { type: Date, default: null },
});

schema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("User", schema);
