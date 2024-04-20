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

// Define routes and associate them with controller methods
router.post("/friend-groups/create", friendGroupController.createFriendGroup);
router.post("/friend-groups/join", friendGroupController.joinFriendGroup);
router.post("/activities/add", activityController.addActivity);
//router.post("/locations", locationController.createLocation);
router.post("/hangouts/create", hangoutController.createHangout);
router.post("/register", userController.registerUser);

//joining friend group with user login
// router.post("/join-group", userController.joinFriendGroup);
// router.post("/create", friendGroupController.createFriendGroup);

// get methods
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

router.get("/activities", async (req, res) => {
  try {
    const activities = await Activity.find({});
    console.log(activities); // This will print the activities to the console
    res.json(activities); // This sends the activities to the client
  } catch (error) {
    console.error("Failed to fetch activities:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch activities", error: error });
  }
});

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

router.get("/hangouts", async (req, res) => {
  try {
    const hangouts = await Hangout.find({});
    console.log(hangouts); // This will print the hangouts to the console
    res.json(hangouts); // This sends the hangouts to the client
  } catch (error) {
    console.error("Failed to fetch hangouts:", error);
    res.status(500).json({ message: "Failed to fetch hangouts", error: error });
  }
});

module.exports = router;
