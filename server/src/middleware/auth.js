const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
  console.log("aa auth");
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.id, "tokens.token": token });

    if (!user) {
      throw new Error();
    }
    req.user = user;
    req.token = token;

    next();
  } catch (error) {
    res.status(401).send({ error: "please authenticate" });
  }
};
module.exports = auth;
