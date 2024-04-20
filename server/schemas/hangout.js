const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hangoutSchema = new Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  friendGroup: {
    type: Schema.Types.ObjectId,
    ref: "FriendGroup",
    required: true,
  },
  created_by: { type: Schema.Types.ObjectId, ref: "User", required: true },
  activities: [{ type: Schema.Types.ObjectId, ref: "Activity" }],
});

const Hangout = mongoose.model("Hangout", hangoutSchema);
module.exports = Hangout;
