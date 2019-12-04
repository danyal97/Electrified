const db = require("../database");
const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();
const session = require("express-session");

const DeleteCustomer = (req, res) => {
  if (req.session.admin) {
    // res.send("already logged in");
    let param = req.params;
    console.log(param);
    let query = "delete from customer where id=?";
    db.query(query, [param.id], (err, result) => {
      if (err != null) {
        res.status(500).send({ error: err.message });
      }
      // CAN  BE CHANGE
      // req.session.user = 0;
      return res.redirect("/customer");
    });
    // return res.render("../views/admincutomer.ejs");
  }
  // return res.render("../views/admincutomer.ejs");
  // return res.redirect("/admin");
};

module.exports = DeleteCustomer;
