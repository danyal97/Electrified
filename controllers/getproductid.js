const db = require("../database");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();
const session = require("express-session");

const GetProductId = (req, res) => {
  //   console.log(req.session.user);
  if (req.session.admin) {
    let query = "select * from product where id=?";
    db.query(query, [req.params.id], (err, result) => {
      if (err) {
        res.status(500).send({ error: err.message });
      }
      //   console.log(result.length);
      if (result.length >= 0) {
        // console.log(result[0]);

        // console.log(user);
        // res.send("this user exist");
        // console.log(user);
        return res.render("../views/adminproductedit.ejs", {
          name: result[0].name,
          profile: true,
          quantity: result[0].quantity,
          imagesrc: result[0].imagesrc,
          description: result[0].description,
          price: result[0].price,
          brandname: result[0].brandname,
          productcategoryname: result[0].productcategoryname,
          id: req.params.id
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

module.exports = GetProductId;
