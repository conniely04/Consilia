const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const friendGroupSchema = new Schema({
  name: { type: String, required: true },
  members: [{ type: Schema.Types.ObjectId, ref: "User" }],
  created_by: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const FriendGroup = mongoose.model("FriendGroup", friendGroupSchema);
module.exports = FriendGroup;
