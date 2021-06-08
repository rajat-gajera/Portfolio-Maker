const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");

const authenticate = async (req, res, next) => {
  try {
    // console.log("cookies");
    //console.log(req.Cookies.jwttoken);
    // res.send(req.cookies);
    const token = req.cookies.jwttoken;
    console.log(token);
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    const rootUser = await User.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });
    if (!rootUser) {
      throw new Error("Uesr Not Found");
    }
    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;
    next();
  } catch (err) {
    res.status(401).send("Unauthorized: NO token proviede");
    console.log("authenticat: ");
    console.log(err);
  }
};
module.exports = authenticate;
