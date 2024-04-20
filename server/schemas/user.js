const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  friendGroups: [
    {
      // New field for storing group references
      type: Schema.Types.ObjectId,
      ref: "FriendGroup",
    },
  ],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
