const db = require("../database");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();
const session = require("express-session");

const Search = (req, res) => {
  //   console.log(req.session.user);
  if (req.session.user) {
    console.log(req.query.search);
    let query = "";
    db.query(
      'SELECT * from product where brandname like "%' +
        req.query.search +
        '%" or name like "%' +
        req.query.search +
        '%" or productcategoryname like "%' +
        req.query.search +
        '%"',
      [],
      (err, result) => {
        if (err) {
          res.status(500).send({ error: err.message });
        }
        res.render("../views/search.ejs", {
          result: result
        });
      }
    );
  }
  //   next();
  //   return res.redirect("/login");
};

module.exports = Search;
