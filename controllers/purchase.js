const db = require("../database");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();
const session = require("express-session");
// const popups = require("popups");

const Purchase = (req, res) => {
  if (req.session.user) {
    db.beginTransaction(err => {
      if (err) {
        res.status(500).send({ error: err.message });
      }
      db.query(
        "SELECT sum(cart.quantity) as totalquantity,product.name,product.price*sum(cart.quantity) as totalprice from cart,product where prod_id=product.id GROUP by prod_id",
        [],
        (err, result) => {
          if (err) {
            return db.rollback(function() {
              throw err;
            });
          }
          console.log(result);
        }
      );
    });
  }
};

module.exports = Purchase;
