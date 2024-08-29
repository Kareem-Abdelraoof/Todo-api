const User = require("./../models/userModel");

const updateUser = (req, res) => {
  res.send("this is the update user route");
};
const deleteUser = (req, res) => {
  res.send("this is the delete user route");
};

module.exports = { updateUser, deleteUser };
