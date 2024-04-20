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

//joining a friend group
// exports.joinFriendGroup = async (req, res) => {
//   const { userId, groupId } = req.body;

//   try {
//     const user = await User.findById(userId);
//     const group = await FriendGroup.findById(groupId);

//     group.members.push(user._id);
//     await group.save();

//     user.friendGroups.push(group._id);
//     await user.save();

//     res.status(200).json({ message: "Joined friend group successfully" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Create new friend group
// exports.createFriendGroup = async (req, res) => {
//   try {
//     const { name, memberIds } = req.body; // Extract group name and optional member IDs from the request body

//     // Create a new friend group object
//     const friendGroup = new FriendGroup({
//       name,
//       members: memberIds || [], // Initialize with provided members, if any
//     });

//     // Save the friend group to the database
//     await friendGroup.save();

//     // If memberIds are provided, update each User document to include this friendGroup
//     if (memberIds && memberIds.length > 0) {
//       await User.updateMany(
//         { _id: { $in: memberIds } },
//         { $push: { friendGroups: friendGroup._id } }
//       );
//     }

//     // Send back a response with the newly created friend group
//     res.status(201).json(friendGroup);
//   } catch (error) {
//     // Handle any errors that occur during the process
//     res.status(400).json({ error: error.message });
//   }
// };
