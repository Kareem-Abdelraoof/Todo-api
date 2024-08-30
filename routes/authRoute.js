const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  changePassword,
} = require("./../controllers/authController");
const { verifyWebToken } = require("./../utils/tokenUtils");

const route = express.Router();

route.post("/register", registerUser);
route.post("/login", loginUser);
route.get("/logout", logoutUser);
route.patch("/change-password", verifyWebToken, changePassword);

module.exports = route;
