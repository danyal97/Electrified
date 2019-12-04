const db = require("../database");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();
const session = require("express-session");

const EditDeliveryPerson = (req, res) => {
  //   console.log(req.session.user);
  let param = req.body;
  console.log(param);
  if (req.session.admin) {
    let query = "update deliveryperson set name=?,phone=?,nic=? where id=?";
    db.query(
      query,
      [param.name, param.phone, param.nic, param.id],
      (err, result) => (err, result) => {
        if (err != null) {
          let error = err.message;
          console.log(error);
        } else {
          console.log(result.affectedRows + " record(s) updated");
          res.redirect("/Adeliveryperson");
        }
      }
    );
  }
  res.redirect("/Adeliveryperson");
};

module.exports = EditDeliveryPerson;
