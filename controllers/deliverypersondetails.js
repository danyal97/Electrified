const db = require("../database");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();
const session = require("express-session");

const DeliveryPersonDetails = (req, res) => {
  //   console.log(req.session.user);
  if (req.session.admin) {
    let query = "select * from deliveryperson";
    db.query(query, (err, result) => {
      if (err) {
        res.status(500).send({ error: err.message });
      }
      if (result.length >= 0) {
        console.log("deliverypersondetails");
        res.render("../views/admindeliveryperson.ejs", {
          result: result
        });
      }
    });
  }
};

module.exports = DeliveryPersonDetails;
