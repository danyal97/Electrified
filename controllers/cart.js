const db = require("../database");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();
const session = require("express-session");

const InsertIntoCart = (req, res) => {
  console.log(req.query.quantity);
  console.log(req.params.id);
  if (req.session.user) {
    let query = "insert into cart set prod_id=?,quantity=?";
    db.query(query, [req.params.id, req.query.quantity], (err, result) => {
      if (err) {
        res.status(500).send({ error: err.message });
      }
      res.redirect("/cartdisplay");
      //   console.log(result.length);
      //   res.json(true);
    });
  }
  //   next();
  //   return res.redirect("/login");
};
//
module.exports = InsertIntoCart;
//
