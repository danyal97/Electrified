const db = require("../database");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();
const session = require("express-session");

const GetCustomerId = (req, res) => {
  //   console.log(req.session.user);
  if (req.session.admin) {
    let query = "select * from customer where id=?";
    db.query(query, [req.params.id], (err, result) => {
      if (err) {
        res.status(500).send({ error: err.message });
      }
      //   console.log(result.length);
      if (result.length >= 0) {
        // console.log(result[0]);
        let user = {
          fullname: result[0].fullname,
          email: result[0].email,
          password: result[0].password,
          phone: result[0].phone,
          gender: result[0].gender
        };
        // console.log(user);
        // res.send("this user exist");
        // console.log(user);
        return res.render("../views/admincustomeredit.ejs", {
          password: result[0].password,
          profile: true,
          fullname: result[0].fullname,
          email: result[0].email,
          address: result[0].address,
          phone: result[0].phone,
          gender: result[0].gender,
          message: "I love you",
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

module.exports = GetCustomerId;
