const db = require("../database");
const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();
const session = require("express-session");

const RemoveFromCart = (req, res) => {
  if (req.session.user) {
    // res.send("already logged in");
    let param = req.params;
    console.log(param);
    let query = "delete from cart where prod_id=? and quantity=?";
    db.query(query, [param.id, param.quantity], (err, result) => {
      if (err != null) {
        console.log("CART DELETE REMOVE QUERRY PROBLEM");
        res.status(500).send({ error: err.message });
      }
      // CAN  BE CHANGE
      // req.session.user = 0;
      return res.redirect("/cartdisplay");
    });
    // return res.render("../views/admincutomer.ejs");
  }
  // return res.render("../views/admincutomer.ejs");
  // return res.redirect("/admin");
};

module.exports = RemoveFromCart;
