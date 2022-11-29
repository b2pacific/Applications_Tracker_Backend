const Application = require("../../models/application");
const { httpStatus500, httpStatus200 } = require("../../utils/httpResponse");

const createApplication = async (req, res) => {
  try {
    const application = new Application({
      ...req.body,
      userId: req.user,
    });

    await application.save();

    return res.status(200).json(httpStatus200("", "Application Created."));
  } catch (err) {
    return res.status(500).json(httpStatus500());
  }
};

module.exports = createApplication;
