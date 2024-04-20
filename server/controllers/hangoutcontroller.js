const Hangout = require("../schemas/hangout");

exports.createHangout = async (req, res) => {
  try {
    const { title, date, friendGroupId, userId } = req.body;
    const newHangout = new Hangout({
      title,
      date,
      friendGroup: friendGroupId,
      created_by: userId,
      participants: [userId],
    });
    await newHangout.save();
    res.status(201).json(newHangout);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getHangout = async (req, res) => {
  try {
    const { hangoutId } = req.params;
    const hangout = await Hangout.findById(hangoutId)
      .populate("created_by", "username")
      .populate("participants", "username");

    if (!hangout) {
      return res.status(404).json({ message: "Hangout not found" });
    }

    res.status(200).json(group);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.joinHangout = async (req, res) => {
  const { hangoutId, userId } = req.body; 

  try {
    const hangout = await Hangout.findById(hangoutId);
    if (!hangout) {
      return res.status(404).json({ message: "Hangout not found" });
    }

    if (hangout.participants.includes(userId)) {
      return res
        .status(400)
        .json({ message: "User already a member of this hangout" });
    }

    // Add the user to the group
    hangout.participants.push(userId);
    await group.save();

    res
      .status(200)
      .json({ message: "User added to the hangout successfully", group });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

