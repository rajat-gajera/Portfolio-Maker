const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  userid: { type: String, requred: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  logoimage: { type: String, required: true },
});
const Project = mongoose.model("project", projectSchema);
module.exports = Project;
