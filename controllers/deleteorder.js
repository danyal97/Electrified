const db = require("../database");
const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();
const session = require("express-session");

const DeleteOrder = (req, res) => {
  if (req.session.admin) {
    // res.send("already logged in");
    let param = req.params;
    console.log(param);
    let query = "delete from myorder where id=?";
    db.query(query, [param.id], (err, result) => {
      if (err != null) {
        console.log("ORDER QUERRY PROBLEM");
        res.status(500).send({ error: err.message });
      }
      // CAN  BE CHANGE
      // req.session.user = 0;
      return res.redirect("/order");
    });
    // return res.render("../views/admincutomer.ejs");
  }
  // return res.render("../views/admincutomer.ejs");
  // return res.redirect("/admin");
};

module.exports = DeleteOrder;
