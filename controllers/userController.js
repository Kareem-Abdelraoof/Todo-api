const User = require("./../models/userModel");

const getUser = async (req, res) => {
  try {
    console.log(`at the get user function !`);
    const user = await User.findById(req.userId);
    if (!user) return res.status(400).json({ message: "there is no user" });
    return res.status(200).json({ message: `here is the user !`, user });
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: `something went wrong`, err });
  }
};

const updateUser = async (req, res) => {
  const newData = req.body;

  // the only fields to change for security measure
  const possibleUpdates = ["email", "username"];

  try {
    // get the user to update
    const user = await User.findById(req.userId);

    // update the certain fields
    possibleUpdates.forEach((el) => {
      if (newData[el]) {
        user[el] = newData[el];
      }
    });

    // save the changes
    const newUser = await user.save();

    // send the finished message
    res
      .status(201)
      .json({ message: "updated successfully", new_user: newUser });
  } catch (err) {
    res.status(400).json({ message: "there was an error", err });
  }
};
const deleteUser = async (req, res) => {
  // find the user and delete it
  try {
    const user = await User.findById(req.userId).select("+active");
    user.active = false;
    // send the confirmation message
    res.status(204);
  } catch (err) {
    res.status(404).json({ message: "there was no user with this id!", err });
  }

  res.send("this is the delete user route");
};

module.exports = { updateUser, deleteUser, getUser };
