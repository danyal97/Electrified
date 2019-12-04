const db = require("../database");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();
const session = require("express-session");

const GetDeliveryPersonId = (req, res) => {
  //   console.log(req.session.user);
  if (req.session.admin) {
    let query = "select * from deliveryperson where id=?";
    db.query(query, [req.params.id], (err, result) => {
      if (err) {
        res.status(500).send({ error: err.message });
      }
      if (result.length >= 0) {
        return res.render("../views/admindeliverypersonedit.ejs", {
          name: result[0].name,
          profile: true,
          nic: result[0].nic,
          phone: result[0].phone,
          message: "I love you",
          id: req.params.id
        });
      }
    });
  }
};

module.exports = GetDeliveryPersonId;
