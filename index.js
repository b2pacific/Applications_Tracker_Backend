const express = require("express");

const app = express();

app.use(express.json());

require("dotenv").config();

require("./config/db.js");

const loginRouter = require("./routes/login");
const accessTokenRouter = require("./routes/accessToken");
const userRouter = require("./routes/user");

const authenticate = require("./utils/authenticate.js");
const { PORT } = require("./utils/constants.js");

app.get("/", (req, res) => {
  return res.status(200).json(req.headers);
});

app.get("/test", authenticate, (req, res) => {
  return res.status(200).json({ message: "Working" });
});

app.use("/login", loginRouter);
app.use("/accessToken", accessTokenRouter);
app.use("/user", userRouter);

app.listen(PORT ? PORT : 4000, () => {
  console.log(`Server started on ${PORT ? PORT : 4000}`);
});
