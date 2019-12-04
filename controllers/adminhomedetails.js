const db = require("../database");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();
const session = require("express-session");

const AdminHomeDetails = (req, res) => {
  //   console.log(req.session.user);
  if (req.session.admin) {
  }
  //   next();
  //   return res.redirect("/login");
};

module.exports = AdminHomeDetails;
