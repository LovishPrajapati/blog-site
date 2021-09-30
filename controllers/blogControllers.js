const User = require("../models/User");
const Blog = require("../models/Blog");

const addBlog = async (req, res, next) => {
  const blog = new Blog(req.body);
  const user = await User.findById(req.user._id);
  user.blogs.push(note);
  if ((await user.save()) && (await blog.save())) {
    res.status(201).json({
      message: "Blog added",
      blog,
    });
  } else {
    res.status(400).json({
      error: "Blog not added",
    });
  }
};

const deleteBlog = async (req, res, next) => {
  const blog = await Blog.findById(req.params.blogId);
  const user = await User.findById(req.user._id);
  if (blog) {
    await blog.remove();
    user.blogs.pull({ _id: req.params.blogId });
    await user.save();
    res.status(200).json({
      message: "Blog deleted succesfully",
    });
  } else {
    res.status(205).json({
      error: "Error in deletion",
    });
  }
};

const updateBlog = async (req, res, next) => {
  const blog = await Blog.findById(req.params.blogId);
  if (blog) {
    blog.title = req.body.title;
    blog.content = req.body.content;
    blog.dateUpdated = new Date();
    blog.createdBy = req.user.fullname;
    const updatedBlog = await blog.save();

    if (updatedBlog) {
      res.status(200).json({
        message: "Successfully updated",
        blog: updatedBlog,
      });
    } else {
      res.status(400).json({
        error: "Blog updation failed",
      });
    }
  } else {
    res.status(404).json({
      error: "Note not found",
    });
  }
};

const getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find({});
    res.status(200).json({
      blogs: blogs,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json(error);
  }
};

module.exports = { addBlog, updateBlog, deleteBlog, getAllBlogs };
