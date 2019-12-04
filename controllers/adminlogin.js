const db = require("../database");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();
const session = require("express-session");

const LoginAdmin = (req, res) => {
  if (req.session.admin) {
    console.log("already Login");
    // res.send("already logged in");
    res.redirect("/admin");
  } else {
    let param = req.body;
    // console.log(param);
    let query = "SELECT * from admin where email=? and password=?";
    db.query(query, [param.email, param.password], (err, result) => {
      if (err != null) {
        res.status(500).send({ error: err.message });
      }
      if (result.length > 0) {
        console.log(result);
        // if (param.password == result[0].password) {
        req.session.admin = result[0].id;
        return res.redirect("/admin");
        // }
      }
      return res.redirect("/adminlogin");
    });
  }
};

module.exports = LoginAdmin;
