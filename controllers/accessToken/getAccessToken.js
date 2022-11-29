const User = require("../../models/user");
const { httpStatus500 } = require("../../utils/httpResponse");

const getAccessToken = async (req, res) => {
  try {
    const refreshToken = req.body.refreshToken;

    const user = await User.findOne({ refreshToken: refreshToken });

    if (user) {
      user.generateToken((err, token) => {
        if (err) {
          res.status(500).json(httpStatus500());
        } else {
          res.status(200).json({ accessToken: token });
        }
      }, user);
    } else {
      return res
        .status(403)
        .json({ message: "Invalid RefreshToken.", status: false });
    }
  } catch (err) {
    return res.status(500).json(httpStatus500());
  }
};

module.exports = getAccessToken;
