const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Hello from the server!" });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
