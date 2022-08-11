const testingRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

testingRouter.post("/reset", async (request, response) => {
  await Blog.deleteMany({}); // delete all blogs
  await User.deleteMany({}); // delete all users

  response.status(204).end();
});

module.exports = testingRouter;
