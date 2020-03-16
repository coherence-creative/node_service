const mongoose = require("mongoose");
const db = require("./database");

const UserSchema = new mongoose.Schema({
  email: String,
  subs: []
});

const UserModel = db.model("user", UserSchema);

module.exports = UserModel;
