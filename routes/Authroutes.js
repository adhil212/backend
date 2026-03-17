const express = require("express");
const router = express.Router();
const User = require("../models/user");

const { login, register } = require("../controller/userccontroller");

router.get("/", async (req, res) => {
  const user = await User.find();
  res.json(user);
});

router.post("/login", login);

router.post("/register", register);

module.exports = router;

