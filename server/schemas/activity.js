const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const activitySchema = new Schema({
  name: { type: String, required: true },
  hangout: { type: Schema.Types.ObjectId, ref: "Hangout", required: true },
  created_by: { type: Schema.Types.ObjectId, ref: "User", required: true },
  preferences: [{ type: String }], // Array of strings to store preferences
});

const Activity = mongoose.model("Activity", activitySchema);
module.exports = Activity;
