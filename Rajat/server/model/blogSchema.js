const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema({
  userid: { type: String, requred: true },
  title: { type: String, required: true },
  topics: { type: String, required: true },
  subtitle: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
  blogimage: { type: String, required: true },
});

const Blog = mongoose.model("blog", blogSchema);
module.exports = Blog;
