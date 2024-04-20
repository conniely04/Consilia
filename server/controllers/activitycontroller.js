const Activity = require("../schemas/activity");
// //cmd line test
//  curl -X POST http://localhost:5001/api/activities \
// -H "Content-Type: application/json" \
// -d '{"name": "Hiking", "preferences": ["Outdoor", "Nature", "Fitness"]}'
exports.addActivity = async (req, res) => {
  try {
    const { name, hangoutId, userId } = req.body;
    const hangout = await Hangout.findById(hangoutId);
    if (!hangout) {
      return res.status(404).json({ message: "Hangout not found" });
    }
    if (hangout.created_by.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "Only hangout creators can add activities" });
    }
    const newActivity = new Activity({
      name,
      hangout: hangoutId,
      created_by: userId,
    });
    await newActivity.save();
    hangout.activities.push(newActivity);
    await hangout.save();
    res.status(201).json(newActivity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
