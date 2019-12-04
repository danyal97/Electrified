// const db = require("../database");
// const bcrypt = require("bcrypt");
// const fs = require("fs");
// const path = require("path");
// const express = require("express");
// const router = express.Router();
// const session = require("express-session");

// const ViewDisplay = (req, res) => {
//   if (req.session.user) {
//     let query = "SELECT * FROM product where productcategoryname='LEDs'";
//     db.query(query, [], (err, result) => {
//       if (err) {
//         res.status(500).send({ error: err.message });
//       }
//       if (result.length >= 0) {
//         return res.render("../views/displayloggedin.ejs", {
//           result: result
//         });
//       }
//     });
//   } else {
//     let query = "SELECT * FROM product where productcategoryname='LEDs'";
//     db.query(query, [], (err, result) => {
//       if (err) {
//         res.status(500).send({ error: err.message });
//       }
//       if (result.length >= 0) {
//         return res.render("../views/display.ejs", {
//           result: result
//         });
//       }
//     });
//   }
// };

// module.exports = ViewDisplay;

const db = require("../database");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();
const session = require("express-session");

const ViewDisplay = (req, res) => {
  if (req.session.user) {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const startindex = (page - 1) * limit;
    const endindex = page * limit;
    let query =
      "SELECT * FROM product  where productcategoryname='LEDs' order by price";
    db.query(query, [], (err, result) => {
      if (err) {
        res.status(500).send({ error: err.message });
      }
      if (result.length >= 0) {
        // console.log(page, limit);
        if (page > 0 && limit > 0) {
          // console.log(startindex, endindex);
          result = result.slice(startindex, endindex);
          // console.log(result);
        }
        console.log(result);
        return res.render("../views/displayloggedin.ejs", {
          result: result
        });
      }
    });
  } else {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const startindex = (page - 1) * limit;
    const endindex = page * limit;
    let query =
      "SELECT * FROM product  where productcategoryname='LEDs' order by price";
    db.query(query, [], (err, result) => {
      if (err) {
        res.status(500).send({ error: err.message });
      }
      if (result.length >= 0) {
        // console.log(page, limit);
        if (page > 0 && limit > 0) {
          // console.log(startindex, endindex);
          result = result.slice(startindex, endindex);
          // console.log(result);
        }
        console.log(result);
        return res.render("../views/display.ejs", {
          result: result
        });
      }
    });
  }
};

module.exports = ViewDisplay;
