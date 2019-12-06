const db = require("../database");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();
const session = require("express-session");

const AddToCart = (req, res) => {
  if (req.session.user) {
    let query = "select * from product";
    db.query(query, (err, result) => {
      if (err) {
        res.status(500).send({ error: err.message });
      }
      if (result.length >= 0) {
        res.render("../views/store.ejs", {
          result: result
        });
      }
    });
  }
};

module.exports = AddToCart;
