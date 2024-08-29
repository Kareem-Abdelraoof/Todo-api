const Todo = require("./../models/todoModel");

const createTodo = (req, res) => {
  res.send("this is the create todo route");
};

const getAllTodos = (req, res) => {
  res.send("this is the get all todos route");
};

const updateTodo = (req, res) => {
  res.send("this is the update Todo route");
};

const deleteTodo = (req, res) => {
  res.send("this is the delete todo route");
};

module.exports = { getAllTodos, updateTodo, deleteTodo, createTodo };
