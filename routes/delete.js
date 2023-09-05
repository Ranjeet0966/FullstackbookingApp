const express = require("express");
const router = express.Router();

const bookingController = require("../controllers/booking");

router.post("/delete", bookingController.postDelete);

module.exports = router;
