const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./user");
const Activity = require("./activity");
const FriendGroup = require("./friendgroup");

const hangoutSchema = new Schema({
  title: { type: String},
  date: { type: Date},
  friendGroup: {
    type: Schema.Types.ObjectId,
    ref: "FriendGroup",
  },
  created_by: { type: Schema.Types.ObjectId, ref: "User", required: true },
  activities: [{ type: Schema.Types.ObjectId, ref: "Activity" }],
  participants: [{ type: Schema.Types.ObjectId, ref: "User" }], // Ensure this is defined
});

const Hangout = mongoose.model("Hangout", hangoutSchema);
module.exports = Hangout;
