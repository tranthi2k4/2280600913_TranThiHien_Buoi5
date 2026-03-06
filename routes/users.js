const express = require("express");
const router = express.Router();
const { User } = require("../models");

router.post("/", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  const users = await User.find({ isDeleted: false }).populate("role");
  res.json(users);
});

router.get("/:id", async (req, res) => {
  const user = await User.findOne({
    _id: req.params.id,
    isDeleted: false,
  }).populate("role");
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

router.delete("/:id", async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { isDeleted: true });
  res.json({ message: "Soft deleted successfully" });
});

router.post("/status/enable", async (req, res) => {
  const { email, username } = req.body;
  const user = await User.findOneAndUpdate(
    { email, username, isDeleted: false },
    { status: true },
    { new: true },
  );
  if (!user) return res.status(404).json({ message: "Invalid info" });
  res.json(user);
});

router.post("/status/disable", async (req, res) => {
  const { email, username } = req.body;
  const user = await User.findOneAndUpdate(
    { email, username, isDeleted: false },
    { status: false },
    { new: true },
  );
  if (!user) return res.status(404).json({ message: "Invalid info" });
  res.json(user);
});

module.exports = router;
