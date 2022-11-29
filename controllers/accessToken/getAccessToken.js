const User = require("../../models/user");
const { httpStatus500, httpStatus403 } = require("../../utils/httpResponse");

const jwt = require("jsonwebtoken");

const { JWT_SECRET_KEY } = require("../../utils/constants");

const getAccessToken = async (req, res) => {
  try {
    const refreshToken = req.body.refreshToken;

    jwt.verify(refreshToken, JWT_SECRET_KEY, function (err, decode) {
      if (err) {
        if (err.name === "TokenExpiredError")
          return res.status(403).json(httpStatus403("Refresh Token Expired"));
        else if (err.message === "jwt malformed")
          return res.status(403).json(httpStatus403("Refresh Token Malformed"));
        else if (err.message === "jwt signature is required")
          return res
            .status(403)
            .json(httpStatus403("Refresh Token Signature required"));
        else if (err.message === "invalid signature")
          return res
            .status(403)
            .json(httpStatus403("Refresh Token Signature Invalid"));
        else
          return res
            .status(403)
            .json(httpStatus403("Error with Refresh Token"));
      }

      User.findOne({ refreshToken: decode.token }, function (err, user) {
        if (err) {
          return res.status(500).json(httpStatus500());
        }

        if (user) {
          user.generateToken((err, token) => {
            if (err) {
              return res.status(500).json(httpStatus500());
            } else {
              return res.status(200).json({ accessToken: token });
            }
          }, user);
        } else {
          return res.status(403).json(httpStatus403("Invalid RefreshToken"));
        }
      });
    });
  } catch (err) {
    return res.status(500).json(httpStatus500());
  }
};

module.exports = getAccessToken;
