const User = require("../../models/user");
const {
  httpStatus500,
  httpStatus404,
  httpStatus200,
} = require("../../utils/httpResponse");

const getUser = async (req, res) => {
  try {
    const userId = req.user;

    const user = await User.findOne({ _id: userId }).lean();

    if (user) {
      return res.status(200).json(httpStatus200(user, ""));
    } else {
      return res.status(404).json(httpStatus404());
    }
  } catch (err) {
    return res.status(500).json(httpStatus500());
  }
};

module.exports = getUser;
