const User = require("../schemas/user");
const FriendGroup = require("../schemas/friendgroup");
const bcrypt = require("bcryptjs");

//testing
exports.registerUser = async (req, res) => {
  try {
    const { username, fullName, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, fullName, password: hashedPassword });
    await newUser.save();
    res.status(201).send("User registered");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
