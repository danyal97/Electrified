const db = require("../database");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();
const session = require("express-session");

const UpdateProfile = (req, res) => {
  //   console.log(req.session.user);
  let param = req.body;
  // console.log(param);
  if (req.session.user) {
    //   let id = {
    //       id: ObjectID(req.params.id) if needed
    //   };
    // param.password = "danyal";
    let query =
      "update customer set fullname=?,email=?,phone=?,gender=?,address=? where id=?";
    db.query(
      query,
      [
        param.fullname,
        param.email,
        // bcrypt.hashSync(param.password, 10),
        param.phone,
        param.gender,
        param.address,
        req.session.user
      ],
      (err, result) => (err, result) => {
        if (err != null) {
          let error = err.message;
          console.log(error);
          if (error.includes("email")) {
            return res.render("../views/profile", {
              email: true,
              phone: false,
              message: "This email already exist"
            });
            // res.send("This email and password already esists");
            // res.redirect("/register");
          }
          if (error.includes("phone")) {
            return res.render("../views/profile", {
              phone: true,
              email: false,
              message: "This phone number already exist"
            });
          }
        } else {
          console.log(result.affectedRows + " record(s) updated");
          res.redirect("/home");
        }
      }
    );
  }
  res.redirect("/home");
  // res.redirect("/updatepage");
  //   next();
  //   return res.redirect("/login");
};

module.exports = UpdateProfile;
