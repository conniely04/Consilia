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
    const flaskServerUrl = "http://localhost:5003/receive-hangout-id"; // Change this to your Flask server URL
    const hangoutIdResponse = await fetch(flaskServerUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hangoutId: newHangout._id.toString() }),
    });

    if (!hangoutIdResponse.ok) {
      throw new Error("Failed to send hangout ID to Flask server");
    }

    const flaskResponse = await hangoutIdResponse.json();
    res.status(201).json({
      message: "Hangout created and ID sent to Flask server successfully",
      flaskServerResponse: flaskResponse,
      hangoutDetails: newHangout,
    });

    res.status(201).json(newHangout);
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

    // Ensure participants array is initialized
    if (!hangout.participants || !Array.isArray(hangout.participants)) {
      hangout.participants = [];
    }

    if (hangout.participants.includes(userId)) {
      return res
        .status(400)
        .json({ message: "User already a member of this hangout" });
    }

    hangout.participants.push(userId);
    await hangout.save();

    res
      .status(200)
      .json({ message: "User added to the hangout successfully", hangout });
  } catch (error) {
    console.error("Error joining hangout:", error);
    res.status(500).json({ error: error.message });
  }
};

//test get all hangouts
exports.getAllHangouts = async (req, res) => {
  try {
    const hangouts = await Hangout.find({})
      .populate("created_by", "username") // Populating just the username of the creator
      .populate("participants", "username") // Populating usernames of all participants
      .populate({
        path: "friendGroup",
        select: "name members", // Selecting to show only the name and members of the friend group
        populate: {
          path: "members",
          select: "username", // Further populating the usernames of the members in the friend group
        },
      })
      .populate({
        path: "activities",
        select: "name description", // Selecting fields of activities to show
      });

    res.status(200).json(hangouts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getHangout = async (req, res) => {
  try {
    const { hangoutId } = req.params; // Extracting hangoutId from the URL parameter
    const hangout = await Hangout.findById(hangoutId)
      .populate("created_by", "username") // Assuming 'created_by' stores a reference to a User document
      .populate("participants", "username"); // Populate all participants' usernames

    if (!hangout) {
      return res.status(404).json({ message: "Hangout not found" });
    }

    res.status(200).json(hangout);
  } catch (error) {
    console.error("Error fetching hangout:", error);
    res.status(500).json({ error: error.message });
  }
};
