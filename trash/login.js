const db = require("../database");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();
const session = require("express-session");
// var AsyncValidator = require("async-validator");

// LoginValidation = require("../validationrule/login");

// var validator = AsyncValidator(LoginValidation.login);

// validator.validate(data, function(errors, fields) {
//   if (errors) {
//     res.render("../index.js", { errors: errors });
//   } else {
const LoginCustomer = (req, res) => {
  let param = req.body;
  let query = "SELECT * from customer where email=?";
  db.query(query, [param.email], (err, result) => {
    if (err != null) {
      res.status(500).send({ error: err.message });
      db.release();
    }
    if (result.length > 0) {
      const match = bcrypt.compareSync(
        param.password,
        result[0].password,
        (err, res) => {
          if (err != null) {
            res.status(500).send({ error: err.message });
          }
        }
      );
      if (match) {
        req.session[param.email] = param.password;
        console.log(req.session);
        return res.render("../views/home.ejs", {
          message: "Pattern found",
          nopattern: false
        });
        // return res.json("MATCH FOUND");
        db.release();
      }
    }
    // req.flash("Wrong Password");
    // res.redirect("");
    return res.render("../views/home.ejs", {
      message: "Please Enter Correct Email and Password",
      nopattern: true
    });
    // res.status(500).send("MATCH NOT FOUND");
    // if (err == null) {
    //   const match = bcrypt.compareSync(
    //     param.password,
    //     result[0].password,
    //     (err, res) => {
    //       if (err != null) {
    //         res.status(500).send({ error: err.message });
    //       }
    //     }
    //   );
    //   if (match) {
    //     return res.json("MATCH FOUND");
    //     db.release();
    //   } else {
    //     // res.writeHead(200, { "Content-Type": "text/html" });
    //     // res
    //     //   .status(500)
    //     //   .sendFile(path.join(__dirname, "../", "public", "index.html"));
    //     // res.status(500).send("MATCH NOT FOUND");
    //     // fs.readFileSync("../public/index.html", null, (err, data) => {
    //     //   if (err != null) {
    //     //     res.status(500).send({ error: err.message });
    //     //     res.write("File Not Found");
    //     //   } else {
    //     //     res.write(data);
    //     //   }
    //     // });
    //     // res.status(500).send("MATCH NOT FOUND");
    //     res.status(500).send("MATCH NOT FOUND");
    //   }
    // }
  });
};

//   }
// });

const RedirectLogin = (req, res, next) => {
  if (!req.session.userid) {
    res.redirect("/loginuser");
  } else {
    next();
  }
};

module.exports = LoginCustomer;


// NEXT TRASH

const db = require("../database");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();
const session = require("express-session");

const LoginCustomer = (req, res) => {
  let param = req.body;
  // // console.log(param);
  let query = "SELECT * from customer where email=?";
  db.query(query, [param.email], (err, result) => {
    if (err != null) {
      res.status(500).send({ error: err.message });
      // db.release();
    }
    //   if (!req.session.userId) {
    if (result.length > 0) {
      const match = bcrypt.compareSync(
        param.password,
        result[0].password,
        (err, res) => {
          if (err != null) {
            res.status(500).send({ error: err.message });
          }
        }
      );
      if (match) {
        //         req.session.userId = 1;
        //         // req.session[param.email] = param.password;
        console.log("MATCH FOUND : " + req.session.userId);
        req.session.userId = param.email;
        // res.send("Admin Homepage");
        //         // return res.render("../views/home.ejs", {
        //         //   message: "Pattern found",
        //         //   nopattern: req.session.userId
        //         // });
        //         // db.release();
        //       }
        //     }
      }
      //   res.send("Admin Homepage");
      //   console.log(req.session.userId);
      //   if (!req.session.userId) {
      //     res.send("Admin Homepage");
      //     // return res.render("../views/home.ejs", {
      //     //   message: "Please Enter Correct Email and Password",
      //     //   nopattern: true
      //     // });
    }
  });
  // };

  const RedirectLogin = (req, res, next) => {
    if (!req.session.userId) {
      // console.log("REDIRECT LOGIN : " + req.session.userId);
      res.redirect("/loginuser");
    } else {
      next();
    }
  };

  module.exports = LoginCustomer;


  // NEXT TRASH
