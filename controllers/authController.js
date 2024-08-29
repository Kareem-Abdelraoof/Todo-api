const registerUser = (req, res) => {
  res.send("this is the register route");
};
const loginUser = (req, res) => {
  res.send("this is the login route");
};
const logoutUser = (req, res) => {
  res.send("this is the logout route");
};

module.exports = { registerUser, loginUser, logoutUser };
