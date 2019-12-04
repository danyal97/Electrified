const db = require("../database");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();
const session = require("express-session");

const CustomerOrderDetails = async (req, res) => {
  //   console.log(req.session.user);
  if (req.session.user) {
    // db.query(
    //   "insert into map set c_id=?,lat=?,lng=?,d_id=?",
    //   [req.session.user, 24.9043, 67.0817, 4],
    //   (err, result) => {}
    // );
    let query =
      "SELECT * from myorder,map,product where map.c_id=myorder.customerid  and product.id=myorder.productid and c_id=141 and d_id=4";
    db.query(query, (err, result) => {
      //   console.log(result.length);
      if (result.length >= 0) {
        console.log(result);
        // console.log(result[0]);
        // let user = {
        //     fullname: result[0].fullname,
        //     email: result[0].email,
        //     password: result[0].password,
        //     phone: result[0].phone,
        //     gender: result[0].gender
        // };
        // console.log(result);
        // res.send("this user exist");
        // console.log(user);
        // MUST BE THIS
        res.render("../views/customerorder.ejs", {
          result: result
        });
        // return res.json(result);
        // res.write(JSON.stringify(user));
        // res.status(200).json(user);
      }
    });
  }
  //   next();
  //   return res.redirect("/login");
};

module.exports = CustomerOrderDetails;
