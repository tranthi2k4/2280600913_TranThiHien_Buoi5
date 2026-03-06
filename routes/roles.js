const express = require("express");
const router = express.Router();
const { Role } = require("../models");

router.post("/", async (req, res) => {
  try {
    const role = new Role(req.body);
    await role.save();
    res.status(201).json(role);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  const roles = await Role.find({ isDeleted: false });
  res.json(roles);
});

router.get("/:id", async (req, res) => {
  const role = await Role.findOne({ _id: req.params.id, isDeleted: false });
  if (!role) return res.status(404).json({ message: "Role not found" });
  res.json(role);
});

router.delete("/:id", async (req, res) => {
  await Role.findByIdAndUpdate(req.params.id, { isDeleted: true });
  res.json({ message: "Soft deleted successfully" });
});

module.exports = router;
