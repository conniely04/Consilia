const mongoose = require("mongoose");
const User = require("./user");
const Schema = mongoose.Schema;
const Hangout = require("./hangout");

const activitySchema = new Schema({
  name: { type: String, required: true },
  hangout: { type: Schema.Types.ObjectId, ref: "Hangout", required: true },
  created_by: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const Activity = mongoose.model("Activity", activitySchema);
module.exports = Activity;
