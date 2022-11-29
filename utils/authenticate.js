const User = require("../models/user");
const { httpStatus403, httpStatus500 } = require("./httpResponse");

let authenticate = async (req, res, next) => {
  try {
    // console.log("Header", req.headers);

    if (!req.headers.authorization)
      return res.status(403).json(httpStatus403());
    else {
      let token = req.headers.authorization;
      if (token == "") {
        return res
          .status(404)
          .json({ message: "Token missing.", success: false });
      } else {
        User.findByToken(token, User, (err, user) => {
          if (err) {
            return res.status(400).json({ message: err, success: false });
          }

          if (!user) {
            return res.status(403).json(httpStatus403());
          } else {
            req.user = user._id;
            next();
          }
        });
      }
    }
  } catch (err) {
    res.status(500).json(httpStatus500());
  }
};

module.exports = authenticate;
