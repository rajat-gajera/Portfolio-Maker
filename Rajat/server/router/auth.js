const express = require("express");
const User = require("../model/userSchema");
require("../db/dbconnection");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/authenticate");
const router = express.Router();
router.get("/", (req, res) => {
  console.log("get on /");
  res.send("Suceess");
});

//Sign Up Router ---------------------------
router.post("/signup", authenticate, async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;

  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: "Required Data is Missing!" });
  }
  if (password !== cpassword) {
    return res
      .status(422)
      .json({ error: "Password and Confirm Password must be same!" });
  }
  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: "Email Already Registered!" });
    }
    const user = new User({ name, email, phone, work, password });

    const result = await user.save();

    if (result) {
      res.status(201).json({ message: "User Registered Successfully!" });
    }
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ errormg: JSON.stringify(e), error: "Failed to Register!" });
  }
});

//Sign In Router----------------------
router.post("/signin", async (req, res) => {
  console.log("REesuested");
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "Please fill all the required Field!" });
  }
  try {
    const findUser = await User.findOne({ email: email });
    if (findUser) {
      const isMatch = await bcryptjs.compare(password, findUser.password);
      console.log(isMatch);
      if (isMatch) {
        const token = await findUser.generateAuthToken(process.env.SECRET_KEY);
        res.cookie("jwttoken", token, {
          expires: new Date(Date.now() + 25892000000),
          httpOnly: true,
        });
        res.status(201).json({ message: "Sign In Successully" });
      } else {
        res.status(422).json({ error: "Invalid Credidentials" });
      }
    } else {
      res.status(422).json({ error: "Invalid Credidentials" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Faild to Sign in!" });
  }
});
router.get("/signout", (req, res) => {
  res.clearCookie("jwttoken", { path: "/" });
  res.status(200).send({ message: "Signed out successfully!" });
});

module.exports = router;
