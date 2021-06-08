const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema({
  userid: { type: String, requred: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  work: { type: String, required: true },
  description: { type: String, required: true },
  tagline: { type: String, required: true },
  about: { type: String, required: true },
  profileimage: { type: String },
  projects: [String],
  blogs: [String],
});

const Portfolio = mongoose.model("portfolio", portfolioSchema);
module.exports = Portfolio;
