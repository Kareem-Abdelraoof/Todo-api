const express = require("express");
const router = express.Router();
const {
  getAllTodos,
  updateTodo,
  deleteTodo,
  createTodo,
} = require("./../controllers/todoController");

router.get("/", getAllTodos);
router.post("/", createTodo);
router.patch("/:id", updateTodo);
router.delete("/:id", deleteTodo);

module.exports = router;
