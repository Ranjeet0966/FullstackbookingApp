const express = require("express");
const router = express.Router();

const bookingController = require("../controllers/booking");

router.get("/get-users", bookingController.getAllUsers);

module.exports = router;
