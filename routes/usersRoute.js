const express = require("express");
const router = express.Router();
const { updateUser, deleteUser } = require("./../controllers/userController");
const { verifyWebToken } = require(`./../utils/tokenUtils`);
const { authorizedUserRoute } = require("./../controllers/authController");

router.patch("/:id", verifyWebToken, authorizedUserRoute, updateUser);
router.delete("/:id", verifyWebToken, authorizedUserRoute, deleteUser);

module.exports = router;
