const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
app.use(express.json());
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.use(bodyParser.json());

//mongo set up
const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI;
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.error("MongoDB connection error:", err));

const friendGroupRoutes = require("./routes/routes");
app.use("/api", friendGroupRoutes);

const activityRoutes = require("./routes/routes");
app.use("/api", activityRoutes);

const locationRoutes = require("./routes/routes");
app.use("/api", locationRoutes);

const hangoutRoutes = require("./routes/routes");
app.use("/api", hangoutRoutes);

const userRoutes = require("./routes/routes");
app.use("/api", userRoutes);

//endpoints
app.get("/", (req, res) => {
  res.json({ message: "HEHEHEHHHE" });
});
