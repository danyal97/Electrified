const db = require("../database");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();
const session = require("express-session");

const GetLoginAdmin = (req, res) => {
  if (req.session.admin) {
    // Need to change
    res.redirect("/admin");
  } else {
    // Need to change
    res.render("../views/adminlogin.ejs");
    // res.redirect("/");
    // res.redirect("/signup");
  }
};

module.exports = GetLoginAdmin;
