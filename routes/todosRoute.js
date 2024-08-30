const express = require("express");
const router = express.Router();
const {
  getAllTodos,
  updateTodo,
  deleteTodo,
  createTodo,
  authorizedTodoRoute,
} = require("./../controllers/todoController");
const { verifyWebToken } = require("./../utils/tokenUtils");

router.get("/", verifyWebToken, getAllTodos);
router.post("/", verifyWebToken, createTodo);
router.patch("/:id", verifyWebToken, authorizedTodoRoute, updateTodo);
router.delete("/:id", verifyWebToken, authorizedTodoRoute, deleteTodo);

module.exports = router;
