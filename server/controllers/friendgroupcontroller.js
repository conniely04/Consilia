const FriendGroup = require("../schemas/friendgroup");

exports.createFriendGroup = async (req, res) => {
  try {
    const { name, userId } = req.body;
    const newGroup = new FriendGroup({
      name,
      created_by: userId,
      members: [userId],
    });
    await newGroup.save();
    res.status(201).json(newGroup);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.joinFriendGroup = async (req, res) => {
  try {
    const { groupId, userId } = req.body;
    const group = await FriendGroup.findById(groupId);
    if (!group.members.includes(userId)) {
      group.members.push(userId);
      await group.save();
    }
    res.status(200).json(group);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
