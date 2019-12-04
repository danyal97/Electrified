const db = require("../database");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();
const session = require("express-session");

const GetBrand = (req, res) => {
  //   console.log(req.session.user);
  if (req.session.user) {
    let query = "SELECT * FROM product WHERE brandname=?";
    db.query(query, [req.params.brandname], (err, result) => {
      if (err) {
        res.status(500).send({ error: err.message });
      }
      //   console.log(result.length);
      if (result.length >= 0) {
        // console.log(result[0]);

        // console.log(user);
        // res.send("this user exist");
        // console.log(user);
        return res.render("../views/.ejs", {
          result: result
        });
        // return res.json(user);
        // res.write(JSON.stringify(user));
        // res.status(200).json(user);
      }
    });
  }
  //   next();
  //   return res.redirect("/login");
};

module.exports = GetBrand;
