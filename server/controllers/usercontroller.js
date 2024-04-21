const User = require("../schemas/user");
const FriendGroup = require("../schemas/friendgroup");
const bcrypt = require("bcryptjs");

exports.registerUser = async (req, res) => {
  try {
    const { username, fullName, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, fullName, password: hashedPassword });
    await newUser.save();

    // Send a JSON response
    res.status(201).json({ message: "User registered" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    
    res.status(201).json({ message: "Login successful", userId: user._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
