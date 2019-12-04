const db = require("../database");
const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();
const session = require("express-session");

const DeleteProduct = (req, res) => {
  if (req.session.admin) {
    // res.send("already logged in");
    let param = req.params;
    let query = "delete from product where id=?";
    db.query(query, [param.id], (err, result) => {
      if (err != null) {
        res.status(500).send({ error: err.message });
      }
      return res.redirect("/product");
    });
  }
  // return res.redirect("/adminloginpage");
};

module.exports = DeleteProduct;
