const db = require("../database");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();
const session = require("express-session");

const LogoutAdmin = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.redirect("/admin");
    }
    res.clearCookie("sid");
    // res.send("logout");
    // get request
    return res.redirect("/adminlogin");
  });
};

module.exports = LogoutAdmin;
