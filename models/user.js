const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../utils/constants");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    photoUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.methods.generateToken = (cb, user) => {
  // let admin = this;
  let token = jwt.sign({ id: user._id.toHexString() }, JWT_SECRET_KEY);

  return cb(null, token);
};

userSchema.statics.findByToken = (token, Users, cb) => {
  jwt.verify(token, JWT_SECRET_KEY, function (err, decode) {
    if (err) {
      console.log(err);
      if (err.name === "TokenExpiredError") return cb("Token Expired");
      else if (err.message === "jwt malformed") return cb("Token Malformed");
      else if (err.message === "jwt signature is required")
        return cb("Token Signature required");
      else if (err.message === "invalid signature")
        return cb("Token Signature Invalid");
      else return cb("Error with Token");
    }
    Users.findOne(
      {
        _id: decode.id,
      },
      function (err, user) {
        if (err) return cb(err);
        else return cb(null, user);
      }
    );
  });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
