const db = require("../database");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();
const session = require("express-session");

const RedirectLogin = (req, res, next) => {
  if (!req.session.userId) {
    console.log("RedirectLogin: " + req.session.userId);
    return res.redirect("http://localhost:3000/login");
  } else {
    // console.log("danyal");
    next();
  }
};

const RedirectHome = (req, res, next) => {
  if (!req.session.userId) {
    console.log("RedirectHome: " + req.session.userId);
    return res.redirect("http://localhost:3000/home");
  } else {
    next();
  }
};

module.exports = {
  RedirectLogin: RedirectLogin(),
  RedirectHome: RedirectHome()
};
