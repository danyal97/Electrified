const db = require("../database");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();
const session = require("express-session");

const GetLoginDeliveryPerson = (req, res) => {
  if (req.session.deliveryperson) {
    // Need to change
    res.redirect("/deliveryperson");
  } else {
    // Need to change
    res.render("../views/deliverypersonlogin.ejs");
    // res.redirect("/");
    // res.redirect("/signup");
  }
};

module.exports = GetLoginDeliveryPerson;
