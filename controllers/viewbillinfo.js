const db = require("../database");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();
const session = require("express-session");

const ViewBillInfo = (req, res) => {
  //   console.log(req.session.user);
  // let query = "select * from product where id=?";
  //   next();
  //   return res.redirect("/login");
  if (req.session.user) {
    return res.render("../views/billinginformation.ejs");
  }
};

module.exports = ViewBillInfo;
