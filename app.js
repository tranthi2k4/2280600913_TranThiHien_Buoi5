const express = require("express");
const mongoose = require("mongoose");
const roleRouter = require("./routes/roles");
const userRouter = require("./routes/users");

const app = express();
app.use(express.json());

const atlasUri =
  "mongodb+srv://buoi-05:QYqAGzaLm8McBHRC@buoi-05.hqhuczl.mongodb.net/AssignmentDB?retryWrites=true&w=majority&appName=buoi-05";

mongoose
  .connect(atlasUri)
  .then(() => console.log("Connected to MongoDB Atlas successfully"))
  .catch((err) => console.error("Could not connect to MongoDB Atlas", err));

app.use("/roles", roleRouter);
app.use("/users", userRouter);

app.post("/enable", (req, res, next) => {
  req.url = "/status/enable";
  userRouter(req, res, next);
});

app.post("/disable", (req, res, next) => {
  req.url = "/status/disable";
  userRouter(req, res, next);
});

module.exports = app;
