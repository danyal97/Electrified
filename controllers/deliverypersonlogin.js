const db = require("../database");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();
const session = require("express-session");

const LoginDeliveryPerson = (req, res) => {
  if (req.session.deliveryperson) {
    console.log("already Login");
    // res.send("already logged in");
    res.redirect("/deliveryperson");
  } else {
    let param = req.body;
    // console.log(param);
    let query = "SELECT * from deliveryperson where name=? and phone=?";
    db.query(query, [param.name, param.phone], (err, result) => {
      if (err != null) {
        res.status(500).send({ error: err.message });
      }
      if (result.length > 0) {
        console.log(result);
        // if (param.password == result[0].password) {
        req.session.deliveryperson = result[0].id;
        return res.redirect("/deliveryperson");
        // }
      }
      return res.redirect("/deliverypersonlogin");
    });
  }
};

module.exports = LoginDeliveryPerson;
