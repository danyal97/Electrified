const db = require("../database");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();
const session = require("express-session");

const CartDisplay = (req, res) => {
  //   console.log(req.session.user);
  if (req.session.user) {
    let query =
      "select prod_id,name,sum(cart.quantity) as quantity,price from cart,product where prod_id=product.id group by prod_id";
    db.query(query, (err, result) => {
      if (err) {
        res.status(500).send({ error: err.message });
      }
      //   console.log(result.length);
      if (result.length >= 0) {
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
        // console.log(result);

        res.render("../views/cart.ejs", {
          result: result,
          outofquantity: false,
          message: null
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

module.exports = CartDisplay;
