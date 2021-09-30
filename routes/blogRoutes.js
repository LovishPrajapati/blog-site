const express = require("express");
const router = express.Router();
const { protect } = require("../controllers/authControllers");
const {
  addBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
  getSingleBlog,
} = require("../controllers/blogControllers");

router.route(":userId/blog/").post(protect, addBlog);
router.route("/").get(getAllBlogs);
router.route("/blog/:blogId").get(getSingleBlog);
router
  .route(":userId/blog/:blogId")
  .put(protect, updateBlog)
  .delete(protect, deleteBlog);

module.exports = router;
