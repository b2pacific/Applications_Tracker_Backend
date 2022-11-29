const mongoose = require("mongoose");

const applicationSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    jobLink: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    referral: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;
