const Hangout = require("../schemas/hangout");

exports.createHangout = async (req, res) => {
  try {
    const { title, date, friendGroupId, userId } = req.body;
    const newHangout = new Hangout({
      title,
      date,
      friendGroup: friendGroupId,
      created_by: userId,
    });
    await newHangout.save();
    res.status(201).json(newHangout);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
