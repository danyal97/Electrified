const db = require("../database");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();
const session = require("express-session");

const LogoutCustomer = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.redirect("/home");
    }
    res.clearCookie("sid");
    // res.send("logout");
    // get request
    // return res.render("../views/home");
    return res.redirect("/");
  });
};

module.exports = LogoutCustomer;
