const express = require("express");
const router = express.Router();
const friendGroupController = require("../controllers/friendgroupcontroller"); // Make sure the path is correct
const activityController = require("../controllers/activitycontroller");
const locationController = require("../controllers/locationcontroller");
const hangoutController = require("../controllers/hangoutcontroller");
const userController = require("../controllers/usercontroller");
const User = require("../schemas/user");
const Activity = require("../schemas/activity");
const FriendGroup = require("../schemas/friendgroup");
const Hangout = require("../schemas/hangout");

// const fetch = require("node-fetch");

//post requests
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.post("/friend-groups/create", friendGroupController.createFriendGroup);
router.post("/friend-groups/join", friendGroupController.joinFriendGroup);
router.post("/hangouts/create", hangoutController.createHangout);
router.post("/hangouts/join", hangoutController.joinHangout);

//GET REQUESTS
//displays all users in the database
router.get(
  "/friend-groups/bubble-code/:bubbleCode",
  friendGroupController.getFriendGroupByBubbleCode
);
router.get("/register", async (req, res) => {
  try {
    const users = await User.find({});
    console.log(users); // This will print the users to the console
    res.json(users); // This sends the users to the client
  } catch (error) {
    console.error("Failed to fetch users:", error);
    res.status(500).json({ message: "Failed to fetch users", error: error });
  }
});

//Put requests
router.put(
  "/friend-groups/:groupId/bubble-code",
  friendGroupController.updateBubbleCode
);

//displays all friend groups in the database
router.get("/friend-groups", async (req, res) => {
  try {
    const friendGroups = await FriendGroup.find({});
    console.log(friendGroups); // This will print the friend groups to the console
    res.json(friendGroups); // This sends the friend groups to the client
  } catch (error) {
    console.error("Failed to fetch friend groups:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch friend groups", error: error });
  }
});

//FRONTEND USE THIS TO DISPLAY FRIEND GROUPS for all users
router.get("/friend-groups/:userId", friendGroupController.getUserFriendGroups);

router.get("/friend-groups/:groupId", friendGroupController.getFriendGroup);
//get user friend group
router.get(
  "/user/:userId/friend-groups",
  friendGroupController.getUserFriendGroups
);
//get hangout
router.get(
  "/friend-groups/:friendGroupId/hangouts",
  friendGroupController.getFriendGroupHangouts
);

//get specific hangout
router.get("/hangouts/:hangoutId", hangoutController.getHangout);

router.get("/hangouts", hangoutController.getAllHangouts);

//get members in specified friend group
router.get("/friend-groups/:groupId/members", async (req, res) => {
  try {
    const { groupId } = req.params;
    const friendGroup = await FriendGroup.findById(groupId).populate("members");

    if (!friendGroup) {
      return res.status(404).json({ message: "Friend group not found" });
    }

    res.status(200).json(friendGroup.members);
  } catch (error) {
    console.error("Failed to retrieve friend group members:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.get(
  "/hangouts/:friend-group-id",
  hangoutController.getHangoutsByFriendGroupId
);

//sending activity name and preference to flask

router.get("/hangouts/:hangoutId/activity", async (req, res) => {
  try {
    const { hangoutId } = req.params;

    // Find the activity associated with the hangout
    const activity = await Activity.findOne({ hangout: hangoutId })
      .select("name preferences")
      .populate("created_by", "username");

    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    // Send the activity name, preferences, and creator's username to the Flask server
    res.json({
      name: activity.name,
      preferences: activity.preferences,
      createdBy: activity.created_by.username,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/update-preferences", async (req, res) => {
  const { activityId, preferences } = req.body;

  try {
    // Update the activity with the new preferences
    const updatedActivity = await Activity.findByIdAndUpdate(
      activityId,
      { $set: { preferences: preferences } },
      { new: true } // Return the updated object
    );

    if (!updatedActivity) {
      return res.status(404).send("Activity not found");
    }

    res.status(200).json(updatedActivity);
  } catch (error) {
    console.error("Failed to update activity:", error);
    res
      .status(500)
      .json({ message: "Error updating activity", error: error.message });
  }
});

router.post("/preferences", async (req, res) => {
  const { preferences } = req.body;

  try {
    console.log("Preferences submitted:", preferences);
    res.json({ message: "Preferences submitted", preferences });
  } catch (error) {
    console.error("Error submitting preferences:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
