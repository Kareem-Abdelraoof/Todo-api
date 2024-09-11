const express = require("express");
const router = express.Router();
const {
  updateUser,
  deleteUser,
  getUser,
} = require("./../controllers/userController");
const { verifyWebToken } = require(`./../utils/tokenUtils`);
const { authorizedUserRoute } = require("./../controllers/authController");

router.get("/:id", verifyWebToken, authorizedUserRoute, getUser);
router.patch("/:id", verifyWebToken, authorizedUserRoute, updateUser);
router.delete("/:id", verifyWebToken, authorizedUserRoute, deleteUser);

module.exports = router;
