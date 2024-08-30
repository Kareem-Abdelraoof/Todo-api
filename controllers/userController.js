const User = require("./../models/userModel");

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
    await User.findByIdAndDelete(req.userId);

    // send the confirmation message
    res.status(204);
  } catch (err) {
    res.status(404).json({ message: "there was no user with this id!", err });
  }

  res.send("this is the delete user route");
};

module.exports = { updateUser, deleteUser };
