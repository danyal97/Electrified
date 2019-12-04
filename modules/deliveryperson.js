const DeliveryPersonLogin = require("../controllers/deliverypersonlogin");
const GetDeliveryPersonLogin = require("../controllers/getdeliverypersonlogin");
const express = require("express");
const router = express.Router();

router.post("/deliverypersonlogin", DeliveryPersonLogin);

router.get("/deliverypersonlogin", GetDeliveryPersonLogin);

module.exports = router;
