const express = require("express");
const router = express.Router();
const { protect } = require("../controllers/authControllers");
const {
  addBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
} = require("../controllers/blogControllers");

router.route("/").post(protect, addBlog).get(getAllBlogs);
router
  .route("/:blogId")
  .put(protect, updateBlog)
  .delete(protect, deleteBlog)
  .get(getSingleBlog);

module.exports = router;
