const express = require("express");
require("dotenv").config();
require("./config/db");
const userRoute = require("./routes/usersRoute");
const todosRoute = require("./routes/todosRoute");
const authRoute = require("./routes/authRoute");

const app = express();

const port = process.env.PORT || 2000;

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/todos", todosRoute);

app.listen(port, () => {
  console.log("Server is running" + "   " + port);
});
