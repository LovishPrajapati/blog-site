const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
  },

  dateUpdated: {
    type: Date,
    default: Date.now,
  },

  createdBy: {
    type: String,
  },
});

module.exports = mongoose.model("Blog", blogSchema);
