const db = require("../database");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();
const session = require("express-session");

const LoginCustomer = (req, res) => {
  if (req.session.user) {
    // res.send("already logged in");
    res.redirect("/home");
  } else {
    let match = false;
    let param = req.body;
    let query = "SELECT * from customer where email=?";
    db.query(query, [param.email], (err, result) => {
      if (err != null) {
        res.status(500).send({ error: err.message });
      }
      if (result.length > 0) {
        match = bcrypt.compareSync(
          param.password,
          result[0].password,
          (err, res) => {
            if (err != null) {
              res.status(500).send({ error: err.message });
            }
          }
        );
        if (match) {
          req.session.user = result[0].id;
          return res.redirect("/home");
          // return res.render("../views/homeloggedin");
          // return res.redirect("/homelogge");
        }
      }
      // res.append("Warning", "199 Miscellaneous warning");
      // res.send("This email already exist");
      // return res.redirect("/");
      // return res
      // .status(400)
      // .json({ msg: "Please enter correct email and password" });
      let query = "select * from product";
      db.query(query, (err, result) => {
        if (err) {
          res.status(500).send({ error: err.message });
        }
        if (result.length >= 0) {
          res.render("../views/home", {
            result: result,
            message: "Please enter correct email and password",
            match: match
          });
          // res.render("../views/homeloggedin.ejs", { result: result });
        }
      });
      // res.render("../views/home", {});
    });
  }
};

module.exports = LoginCustomer;
