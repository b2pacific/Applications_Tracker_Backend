const mongoose = require("mongoose");
const { MONGO_URL } = require("../utils/constants");

if (process.env.NODE_ENV == "development") {
  exports.conn = mongoose.connect(
    "mongodb://localhost:27017/newProj",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useFindAndModify: false,
    },
    (err) => {
      if (err) console.log(err);
      else console.log("Connected to database");
    }
  );
} else {
  exports.conn = mongoose.connect(
    MONGO_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) console.log(err);
      else console.log("Connected to database");
    }
  );
}
