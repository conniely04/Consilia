const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  name: String,
  address: String,
  // For geospatial queries, you could use GeoJSON formatting
  geo: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: { type: [Number], index: "2dsphere" },
  },
  // Other location details...
});

const Location = mongoose.model("location", locationSchema);

module.exports = Location;
