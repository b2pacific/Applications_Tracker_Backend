const getAccessToken = require("../controllers/accessToken/getAccessToken");

const router = require("express").Router();

router.post("/", getAccessToken);

module.exports = router;
