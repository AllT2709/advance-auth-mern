const express = require("express");
const router = express.Router();

const { getPrivateData } = require("../controllers/private");
const { protectRoute } = require("../middleware/auth");

router.get("/", protectRoute, getPrivateData);

module.exports = router;
