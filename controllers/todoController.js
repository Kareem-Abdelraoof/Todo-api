const Todo = require("./../models/todoModel");

const createTodo = async (req, res) => {
  // adjust the todo
  const todo = { ...req.body, userId: req.userId };

  try {
    // create the todo
    const createdTodo = await Todo.create(todo);

    // respond with the success result
    res
      .status(201)
      .json({ message: "created successfully", Todo: createdTodo });
  } catch (err) {
    res.status(400).json({ message: "something went wrong", err });
  }
};

const getAllTodos = async (req, res) => {
  // find all the todos with the userId
  try {
    const todos = await Todo.find({ userId: req.userId });
    if (!todos) return res.status(400).json({ message: "there is no todos" });

    // send the todos in the response
    return res
      .status(200)
      .json({ message: "all the todos", length: todos.length, todos });
  } catch (err) {
    res.status(400).json({ message: `there was an error`, err });
  }
};

const updateTodo = async (req, res) => {
  // get the field
  const { title, description, completed } = req.body;
  const todo = req.todo;

  try {
    // update the field
    if (title) todo.title = title;
    if (description) todo.description = description;
    if (completed !== undefined) todo.completed = completed;
    const updatedTodo = await todo.save();

    // respond with the updated todo
    return res.status(201).json({ message: "updated successfully", todo });
  } catch (err) {
    return res.status(400).json({ message: "something went wrong !", err });
  }
};

const deleteTodo = async (req, res) => {
  // remove the todo
  const todo = req.todo;
  await todo.deleteOne();

  // respond with success
  return res.status(204).send();
};

// const isOwner = (obj, id) => {
//   return obj.userId === id;
// }

const authorizedTodoRoute = async (req, res, next) => {
  // find the todo userId and compare it with one from the middleware
  const todoId = req.params.id;
  const userId = req.userId;
  const todo = await Todo.findById(todoId).select("+userId");
  if (!todo)
    return res.status(401).json({ message: "there was no todo with this id" });
  if (todo.userId.toString() !== userId)
    return res
      .status(404)
      .json({ message: "you are not authorized with this action" });

  // send the todo at the request
  req.todo = todo;
  next();
};

module.exports = {
  getAllTodos,
  updateTodo,
  deleteTodo,
  createTodo,
  authorizedTodoRoute,
};
