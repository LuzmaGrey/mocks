const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/test");

mongoose.connection.on("open", () => {
  console.log("Database ok!");
});

mongoose.connection.on("error", () => {
  console.log("Database error");
});
