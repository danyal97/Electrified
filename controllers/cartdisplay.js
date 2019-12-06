const db = require("../database");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();
const session = require("express-session");

const CartDisplay = (req, res) => {
  if (req.session.user) {
    let query =
      "select prod_id,name,sum(cart.quantity) as quantity,price from cart,product where prod_id=product.id group by prod_id";
    db.query(query, (err, result) => {
      if (err) {
        res.status(500).send({ error: err.message });
      }
      if (result.length >= 0) {
        res.render("../views/cart.ejs", {
          result: result,
          outofquantity: false,
          message: null
        });
      }
    });
  }
};

module.exports = CartDisplay;
