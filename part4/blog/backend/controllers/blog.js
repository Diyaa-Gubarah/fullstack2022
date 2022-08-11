const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

// GET /api/blogs
blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

// GET /api/blogs/:id
blogRouter.get("/:id", async (request, response) => {
  const id = request.params.id;
  const blog = await Blog.findById(id);
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

// DELETE /api/blogs/:id
blogRouter.delete("/:id", async (request, response) => {
  const id = request.params.id;

  const blog = await Blog.findById({ _id: id });

  if (blog.user.toString() === request.userId.toString()) {
    const dblog = await Blog.findByIdAndRemove(id);
    if (dblog) {
      response.status(204).end();
    } else {
      response.status(404).end();
    }
  } else {
    response.status(401).json({ error: "only owner can delete this blog" });
  }
});

// POST /api/blogs

blogRouter.post("/", async (request, response) => {
  const { title, author, url, userId } = request.body;

  const decodedToken = jwt.verify(request.token, process.env.JWT_SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const user = await User.findById(decodedToken.id);

  // const user = await User.findById(userId);

  const blog = new Blog({
    title,
    author,
    url,
    user: user._id,
  });

  const newBlog = await blog.save();
  user.blogs = user.blogs.concat(newBlog._id);
  await user.save();
  response.status(201).json(newBlog);
});

// PUT /api/blogs/:id
blogRouter.put("/:id", async (request, response) => {
  const { title, author, url, likes } = request.body;

  const blog = {
    title,
    author,
    url,
    likes,
  };

  const current = await Blog.findById(request.params.id);
  // request.userId comes from the middleware function defined in middleware.js
  if (current.user.toString() === request.userId.toString()) {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true,
      context: "query",
      runValidators: true,
    });

    if (updatedBlog) {
      response.json(updatedBlog);
    } else {
      response.status(404).end();
    }
  } else {
    return response
      .status(401)
      .json({ error: "only owner can update this blog" });
  }
});

module.exports = blogRouter;
