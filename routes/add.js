const express = require("express");
const router = express.Router();

const bookingController = require("../controllers/booking");

router.post("/add-user", bookingController.addBooking);

module.exports = router;
