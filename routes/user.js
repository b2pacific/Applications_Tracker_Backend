const getUser = require("../controllers/user/getUser");

const authenticate = require("../utils/authenticate");

const router = require("express").Router();

router.get("/", authenticate, getUser);

module.exports = router;
