const express = require("express");

const app = express();

app.use(express.json());

require("dotenv").config();

require("./config/db.js");

const loginRouter = require("./routes/login");
const accessTokenRouter = require("./routes/accessToken");
const authenticate = require("./utils/authenticate.js");

app.get("/test", authenticate, (req, res) => {
  return res.status(200).json({ message: "Working" });
});
app.use("/login", loginRouter);
app.use("/accessToken", accessTokenRouter);

app.listen(4000, () => {
  console.log(`Server started on 3000`);
});
