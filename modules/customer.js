const RegisterCustomer = require("../controllers/register");
const LoginCustomer = require("../controllers/login");
const GetRegister = require("../controllers/getregister");
const LogoutCustomer = require("../controllers/logout");
const ViewProfile = require("../controllers/profile");
const UpdateProfile = require("../controllers/update");
const GetLoginCustomer = require("../controllers/getlogincustomer");
const Search = require("../controllers/search");
const CustomerOrderDetails = require("../controllers/customerorderdetails");
const PriceSorting = require("../controllers/pricesorting");
const express = require("express");
const router = express.Router();

router.get("/register", GetRegister);

router.get("/login", GetLoginCustomer);

router.post("/register", RegisterCustomer);

router.post("/login", LoginCustomer);

router.get("/logout", LogoutCustomer);

router.get("/profile", ViewProfile);

router.get("/search", Search);

router.get("/customerorder", CustomerOrderDetails);

router.get("/searchcategoryprice", PriceSorting);
// router.put("/updateprofile", UpdateProfile);
// router.get(
//   "/updateprofile/:fullname/:email/:gender/address/:phone",
//   UpdateProfile
// );
// router.get("/UpdateProfile",)

router.post("/UpdateProfile", UpdateProfile);

module.exports = router;
