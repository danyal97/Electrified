const db = require("../database");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();
const session = require("express-session");

const EditProduct = (req, res) => {
  //   console.log(req.session.user);
  let param = req.body;
  console.log(param);
  if (req.session.admin) {
    //   let id = {
    //       id: ObjectID(req.params.id) if needed
    //   };
    // param.password = "danyal";
    let query =
      "update product set name=?,quantity=?,imagesrc=?,description=?,price=?,brandname=?,productcategoryname=? where id=?";
    db.query(
      query,
      [
        param.name,
        param.quantity,
        // bcrypt.hashSync(param.password, 10),
        param.imagesrc,
        param.description,
        param.price,
        param.brandname,
        param.productcategoryname,
        param.id
      ],
      (err, result) => (err, result) => {
        if (err != null) {
          let error = err.message;
          console.log(error);
          if (error.includes("name")) {
            return res.render("../views/adminproductedit.ejs", {
              // email: true,
              // phone: false,
              // message: "This email already exist"
            });
            // res.send("This email and password already esists");
            // res.redirect("/register");
          }
        } else {
          console.log(result.affectedRows + " record(s) updated");
          res.redirect("/product");
        }
      }
    );
  }
  res.redirect("/product");
  // res.redirect("/updatepage");
  //   next();
  //   return res.redirect("/login");
};

module.exports = EditProduct;
