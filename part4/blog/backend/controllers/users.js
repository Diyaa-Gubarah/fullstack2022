const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

// POST /api/users
usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  //Check if password is at least 3 characters long
  if (password.length < 3) {
    return response
      .status(400)
      .json({ error: "password must be at least 3 characters long" });
  }

  // Check if username is already taken
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return response.status(400).json({
      error: "username must be unique",
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

// GET /api/users
usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", { title: 1, author: 1 });

  response.json(users);
});

module.exports = usersRouter;
