const User = require("../schemas/user");
const FriendGroup = require("../schemas/friendgroup");

//testing
exports.registerUser = async (req, res) => {
  try {
    const { username } = req.body;
    //const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username });
    await newUser.save();
    res.status(201).send("User registered");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
