const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Hangout = require("./hangout");
const User = require("./user");

const friendGroupSchema = new Schema({
  name: { type: String, required: true },
  created_by: { type: Schema.Types.ObjectId, ref: "User", required: true },
  members: [{ type: Schema.Types.ObjectId, ref: "User" }],
  hangouts: [{ type: Schema.Types.ObjectId, ref: "Hangout" }], // Reference to Hangouts
  bubbleCode: {type: String}
});

const FriendGroup = mongoose.model("FriendGroup", friendGroupSchema);
module.exports = FriendGroup;
