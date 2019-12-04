const express = require("express");
const Controller = require("../controllers/login");
const router = express.Router();
const db = require("../database");

router.get("/", function(req, res) {
  if (req.session.user) {
    let query = "select * from product";
    db.query(query, (err, result) => {
      if (err) {
        res.status(500).send({ error: err.message });
      }
      if (result.length >= 0) {
        res.render("../views/homeloggedin.ejs", { result: result });
      }
    });
    // console.log(Product[0].id);

    // res.send("Welcome to home");
  } else {
    let query = "select * from product";
    db.query(query, (err, result) => {
      if (err) {
        res.status(500).send({ error: err.message });
      }
      if (result.length >= 0) {
        res.render("../views/home", {
          message: "",
          match: true,
          result: result
        });
      }
    });
    // console.log();

    // res.render("../views/homeloggedin.ejs");
    // res.redirect("/");
    // login page pe ayega
  }
  // res.render("../views/home.ejs", {});
});
router.get("/home", (req, res) => {
  // console.log(Product[0]);
  if (req.session.user) {
    let query = "select * from product";
    db.query(query, (err, result) => {
      if (err) {
        res.status(500).send({ error: err.message });
      }
      if (result.length >= 0) {
        res.render("../views/homeloggedin.ejs", { result: result });
        // res.render("../views/homeloggedin.ejs", { result: result });
      }
    });

    // res.send("Welcome to home");
  } else {
    // console.log(Product[0]);
    // res.render("../views/homeloggedin.ejs");
    res.redirect("/");
    // login page pe ayega
  }
});

router.get("/admin", (req, res) => {
  if (req.session.admin) {
    // let order;
    query =
      "SELECT customer.email, product.name, count(customerid) as OrderPlace, myorder.quantity,bill, myorder.datetime from myorder, product, customer WHERE  myorder.productid = product.id and myorder.customerid = customer.id  GROUP BY customerid, customer.email,product.name,datetime";
    db.query(query, [], (err, result) => {
      if (err) {
        res.status(500).send({ error: err.message });
      }
      //   console.log(result.length);
      if (result.length >= 0) {
        res.render("../views/adminhome.ejs", { result: result });
        // order = result;
      }
    });
    // console.log(order);

    // res.send("Welcome to admin");
  } else {
    res.redirect("/adminlogin");
    // login page ayega
  }
});

router.get("/deliveryperson", (req, res) => {
  if (req.session.deliveryperson) {
    res.render("../views/package.ejs");
  } else {
    res.redirect("/deliverypersonlogin");
  }
});

// router.get("/register", function(req, res) {
//   return res.render("../views/signup.ejs", {
//     email: false,
//     phone: false
//   });
// });
module.exports = router;
