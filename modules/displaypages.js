const Accessories = require("../controllers/accessories");
const Display = require("../controllers/display");
const DisplayPagination = require("../controllers/displaypagination");
const Mobile = require("../controllers/mobile");
const Pc = require("../controllers/pc");
const HouseHold = require("../controllers/household");

const CARTFALTO = require("../controllers/cartfalto");

const express = require("express");

const router = express.Router();

router.get("/household", HouseHold);

router.get("/pc", Pc);

router.get("/mobile", Mobile);

router.get("/display", Display);

router.get("/accessories", Accessories);

router.get("/cartfalto", CARTFALTO);

// router.get("/display", DisplayPagination);

module.exports = router;
