const express = require("express");
require("../db/dbconnection");
const User = require("../model/userSchema");
const Project = require("../model/projectSchema");
const Blog = require("../model/blogSchema");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/authenticate");
const Portfolio = require("../model/portfolioSchema");
const router = express.Router();
const multer = require("multer");

router.get("/getuser", authenticate, (req, res) => {
  // console.log(req.rootUser);
  res.json(req.rootUser);
});
//Make Portfolio -------
router.post("/makeportfolio", async (req, res) => {
  try {
    const { userid, name, email, work, description, tagline, about } = req.body;

    if (!userid || !name || !email || !work || !description || !about) {
      res.status(422).json({ error: "All Data are required!" });
      return;
    }

    const findportfolio = await Portfolio.findOne({ userid: userid });
    const portfolio = new Portfolio({
      userid,
      name,
      email,
      work,
      description,
      tagline,
      about,
    });

    // console.log(JSON.stringify(req));
    if (findportfolio) {
      const result = await Portfolio.updateOne(
        { userid: userid },
        {
          userid,
          name,
          email,
          work,
          description,
          tagline,
          about,
        }
      );
      if (result) {
        res.status(201).json({ message: "Updated Successfullly" });
      } else {
        res.status(422).json({ error: "Failed to update!" });
      }
    } else {
      const result = await portfolio.save();
      if (result) {
        res.status(201).json({ message: "Updated Successfullly" });
      } else {
        res.status(422).json({ error: "Failed to update!" });
      }
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Faild to save Changes" });
  }
});
router.post("/updateprofilepic", async (req, res) => {
  const { userid, imagehash } = req.body;
  try {
    const result = await Portfolio.updateOne(
      { userid: userid },
      { profileimage: imagehash }
    );
    if (result) {
      res.status(201).json({ message: "Profile image updated" });
    } else {
      res.status(422).json({ error: "failed to update profile image." });
    }
  } catch (e) {
    console.log(e);
  }
});
router.get("/getportfolios", async (req, res) => {
  try {
    const result = await Portfolio.find({});
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(422).json({ error: "data not found!" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "some error" });
  }
});
router.get("/portfolio/:userid", async (req, res) => {
  try {
    const uid = req.params.userid;
    const result = await Portfolio.findOne({ userid: uid });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(422).json({ error: "Portfolio not found!" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "some error" });
  }
});
router.post("/addproject", async (req, res) => {
  try {
    const { userid, name, type, description, hash } = req.body;
    if (!userid || !name || !type || !description || !hash) {
      res.status(422).json({ error: "All Data are required!" });
      return;
    }
    const logoimage = hash;
    const project = new Project({ userid, name, type, description, logoimage });
    const findproject = await Project.findOne({ userid: userid });
    if (findproject) {
      const result = await Project.updateOne(
        { userid: userid },
        {
          userid: userid,
          name: name,
          type: type,
          description: description,
          logoimage: hash,
        }
      );
      if (result) {
        res.status(201).json({ message: "Project Updated" });
      } else {
        res.status(422).json({ error: "failed to update project." });
      }
    } else {
      const result = await project.save();
      if (result) {
        res.status(201).json({ message: "Project Added Successfullly" });
      } else {
        res.status(422).json({ error: "Failed to Add Subject!" });
      }
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "failed to add project!!" });
  }
});
router.get("/projects/:userid", async (req, res) => {
  try {
    const userid = req.params.userid;

    const result = await Project.find({ userid: userid });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(422).json({ error: "Failed to load projects" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
  }
});
router.delete("/removeproject/:projectid", async (req, res) => {
  try {
    const projectid = req.params.projectid;
    const result = await Project.deleteOne({ _id: projectid });
    if (result) {
      res.status(202).json({ message: "Project Removed Successfully" });
    } else {
      res.status(203).json({ error: "Project Remove Failed!" });
    }
  } catch (e) {
    console.log(e);
  }
});

router.post("/addblog", async (req, res) => {
  try {
    const { userid, title, topics, subtitle, description, hash } = req.body;
    if (!userid || !title || !topics || !subtitle || !description || !hash) {
      res.status(422).json({ error: "All Data are required!" });
      return;
    }
    const date = new Date().toLocaleDateString();
    const blogimage = hash;
    // console.log(req.body + date + blogimage);
    const blog = new Blog({
      userid,
      title,
      topics,
      subtitle,
      description,
      date,
      blogimage,
    });
    const findproject = await Blog.findOne({ userid: userid });
    if (findproject) {
      const result = await Blog.updateOne(
        { userid: userid },
        {
          userid: userid,
          title: title,
          topics: topics,
          subtitle: subtitle,
          description: description,
          date: date,
          blogimage: blogimage,
        }
      );
      if (result) {
        res.status(201).json({ message: "Blog Updated" });
      } else {
        res.status(422).json({ error: "failed to update Blog." });
      }
    } else {
      const result = await blog.save();
      if (result) {
        res.status(201).json({ message: "Blog Added Successfullly" });
      } else {
        res.status(422).json({ error: "Failed to Add Subject!" });
      }
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "failed to add Blog!!" });
  }
});
router.get("/blogs/:userid", async (req, res) => {
  try {
    const userid = req.params.userid;

    const result = await Blog.find({ userid: userid });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(422).json({ error: "Failed to load projects" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
  }
});

router.get("/blog/:blogid", async (req, res) => {
  try {
    const blogid = req.params.blogid;

    const result = await Blog.findOne({ _id: blogid });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(422).json({ error: "Failed to load Blog" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
  }
});
module.exports = router;
