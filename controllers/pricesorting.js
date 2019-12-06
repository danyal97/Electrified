const db = require("../database");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();
const session = require("express-session");

const ProductPriceDetails = (req, res) => {
  console.log(req.query.search, req.query.price);
  if (req.session.user) {
    let query =
      'select * from product where productcategoryname="' +
      req.query.search +
      '" and price between "' +
      req.query.price +
      '" and "' +
      req.query.price2 +
      '"';
    db.query(query, [], (err, result) => {
      if (err) {
        res.status(500).send({ error: err.message });
      }
      if (result.length >= 0) {
        console.log(result);
        res.render("../views/search.ejs", {
          result: result
        });
      }
    });
  }
};

module.exports = ProductPriceDetails;
