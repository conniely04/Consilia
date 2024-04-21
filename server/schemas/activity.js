const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const activitySchema = new Schema({
  name: { type: String },
  hangout: { type: Schema.Types.ObjectId, ref: "Hangout" },
  created_by: { type: Schema.Types.ObjectId, ref: "User" },
  preferences: [{ type: String, required: true }], // Array of strings to store preferences
});

const Activity = mongoose.model("Activity", activitySchema);
module.exports = Activity;
