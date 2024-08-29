const mongoose = require("mongoose");

const dbURL = process.env.MONGO_URL.replace(
  "<db_password>",
  process.env.MONGO_PASSWORD
);

mongoose
  .connect(dbURL)
  .then(() => {
    console.log("the data base is connected");
  })
  .catch((err) => {
    console.log(`failed to connect to the database because of the err:${err}`);
  });
