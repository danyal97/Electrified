const DeleteCustomer = require("../controllers/deletecustomer");
const DeleteDeliveryPerson = require("../controllers/deletedeliveryperson");
const DeleteProduct = require("../controllers/deleteproduct");
const InsertProduct = require("../controllers/insertproduct");
const AdminLogin = require("../controllers/adminlogin");
const AdminLogout = require("../controllers/adminlogout");
const ViewCustomer = require("../controllers/customerdetail");
const ViewProduct = require("../controllers/productdetail");
const ViewOrder = require("../controllers/orderdetail");
const ViewDeliveryPerson = require("../controllers/deliverypersondetails");
const GetAdminLogin = require("../controllers/getadminlogin");
const EditCustomer = require("../controllers/editcustomer");
const EditProduct = require("../controllers/editproduct");
const EditDeliveryPerson = require("../controllers/editdeliveryperson");
// const AdminRegister = require("../controllers/adminregister");
const GetDeliveryPersonId = require("../controllers/getdeliverypersonid");
const GetCustomerId = require("../controllers/getcustomerid");
const GetProductId = require("../controllers/getproductid");
const AdminHomeDetails = require("../controllers/adminhomedetails");
const DeleteOrder = require("../controllers/deleteorder");
const express = require("express");
const router = express.Router();

router.get("/admin/order/delete/:id", DeleteOrder);

router.get("/admin/product/view/:id", GetProductId);
router.get("/admin/product/delete/:id", DeleteProduct);
router.post("/admin/product/edit/", EditProduct);

router.get("/order", ViewOrder);
router.get("/product", ViewProduct);

router.get("/adminlogout", AdminLogout);
router.post("/adminlogin", AdminLogin);
router.get("/adminlogin", GetAdminLogin);

router.get("/customer", ViewCustomer);
router.post("/admin/customer/edit", EditCustomer);
router.post("/admin/product/insert/:id", InsertProduct);
router.get("/admin/customer/view/:id", GetCustomerId);
router.get("/admin/customer/delete/:id", DeleteCustomer);

router.get("/Adeliveryperson", ViewDeliveryPerson);
router.post("/admin/deliveryperson/edit", EditDeliveryPerson);
router.get("/admin/deliveryperson/view/:id", GetDeliveryPersonId);
router.get("/admin/deliveryperson/delete/:id", DeleteDeliveryPerson);

module.exports = router;
