const db = require("../database");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();
const session = require("express-session");

const GetLoginCustomer = (req, res) => {
  if (req.session.user) {
    res.redirect("/home");
  } else {
    res.redirect("/");
    // res.redirect("/signup");
  }
};

module.exports = GetLoginCustomer;
