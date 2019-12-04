const db = require("../database");
const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();
const session = require("express-session");

const DeleteDeliveryPerson = (req, res) => {
  if (req.session.admin) {
    let param = req.params;
    console.log(param.id);
    let query = "delete from deliveryperson where id=?";
    db.query(query, [param.id], (err, result) => {
      if (err != null) {
        res.status(500).send({ error: err.message });
      }

      return res.redirect("/Adeliveryperson");
    });
  }
};

module.exports = DeleteDeliveryPerson;
