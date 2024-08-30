const User = require("./../models/userModel");
const bcrypt = require("bcrypt");
const { generateWebToken, verifyToken } = require("./../utils/tokenUtils");

const registerUser = async (req, res) => {
  //check the data
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ msg: "there is no data " });
  }
  try {
    //add the user
    const createdUser = await User.create(req.body);

    //generate a token and send it
    const token = generateWebToken(createdUser._id);

    //respond with a nice response
    res.status(201).json({
      message: "the user is created successfully",
      user_id: createdUser._id,
      token,
    });
  } catch (err) {
    res.status(400).json({
      message: "there was an error",
      err: err.message,
    });
  }
};
const loginUser = async (req, res) => {
  //get the credentials
  const { email, password } = req.body;
  try {
    //find the user
    const user = await User.findOne({ email }).select(`+password`);
    if (!user)
      return res
        .status(401)
        .json({ message: "there was no user with this credentials" });
    //check the password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).json({ err: "invalid credentials" });
    //generate web token
    const token = generateWebToken(user._id);

    //send the response
    res.status(200).json({ token, user_id: user._id });
  } catch (err) {
    res.status(400).json({ msg: "there was an error", err: err });
  }
};

const logoutUser = (req, res) => {
  res.status(204).send();
};

const changePassword = async (req, res) => {
  // get the user Id and new data
  const _id = req.userId;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  // check the user if it exists
  const user = await User.findById({ _id }).select(`+password`);
  if (!user) return res.status(400).json({ message: "there is no user" });

  // check the old password
  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) return res.status(401).json({ message: "wrong old password" });

  // change the new password
  user.password = newPassword;
  const newUser = await user.save();

  // respond with success
  res.status(201).json({ message: "changed successfully", newUser });
};

const authorizedUserRoute = async (req, res, next) => {
  const id = req.params.id;
  if (id !== req.userId) {
    return res
      .status(400)
      .json({ message: "the user is not authorized of this action" });
  }
  return next();
};
module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  changePassword,
  authorizedUserRoute,
};
