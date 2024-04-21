const FriendGroup = require("../schemas/friendgroup");
const User = require("../schemas/user");

exports.createFriendGroup = async (req, res) => {
  try {
    const { name, userId } = req.body;
    const newGroup = new FriendGroup({
      name,
      created_by: userId,
      members: [userId], // Ensure this is an array of ObjectIds
    });
    await newGroup.save();
    res.status(201).json(newGroup);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getFriendGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const group = await FriendGroup.findById(groupId)
      .populate("created_by", "username") // Populating the username of the creator
      .populate("members", "username"); // Optionally populate member usernames too

    if (!group) {
      return res.status(404).json({ message: "Friend group not found" });
    }

    res.status(200).json(group);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.joinFriendGroup = async (req, res) => {
  const { groupId, userId } = req.body; // IDs passed in the body of the request

  try {
    // Find the group by ID
    const group = await FriendGroup.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Check if the user is already a member of the group
    if (group.members.includes(userId)) {
      return res
        .status(400)
        .json({ message: "User already a member of this group" });
    }

    // Add the user to the group
    group.members.push(userId);
    await group.save();

    res
      .status(200)
      .json({ message: "User added to the group successfully", group });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserFriendGroups = async (req, res) => {
  try {
    console.log('imhere')
    const { userId } = req.params;
    const friendGroups = await FriendGroup.find({ members: userId }).populate(
      "members",
      "username"
    );
    res.json(friendGroups);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
