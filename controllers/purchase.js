const db = require("../database");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();
const session = require("express-session");
const nodemailer = require("nodemailer");
// const popups = require("popups");

const Purchase = (req, res) => {
  if (req.session.user) {
    db.beginTransaction(err => {
      if (err) {
        res.status(500).send({ error: err.message });
      }
      db.query(
        "SELECT prod_id,sum(cart.quantity) as totalcartquantity,product.quantity-sum(cart.quantity) as Quantityleft,product.name,product.price*sum(cart.quantity) as totalprice from cart,product where prod_id=product.id GROUP by prod_id",
        [],
        (err, result) => {
          if (err) {
            return db.rollback(function() {
              throw err;
            });
          }
          let bool = false;
          let ProductsOutOfQuantity = [];
          let ProductsInQuantity = [];
          for (let i = 0; i < result.length; i++) {
            if (result[i].Quantityleft < 0) {
              ProductsOutOfQuantity.push(result[i].name);
              db.query(
                "delete from cart where prod_id=?",
                [result[i].prod_id],
                (err, result) => {
                  if (err) {
                    return db.rollback(function() {
                      throw err;
                    });
                  }
                }
              );
              bool = true;
              // break;
            } else {
              let UpdatedQuantity = result[i].Quantityleft;
              let ProductId = result[i].prod_id;
              ProductsInQuantity.push(result[i].name);
              db.query(
                "INSERT INTO  myorder set bill=?,quantity=?,deliverystatus=?,customerid=?,productid=?",
                [
                  result[i].totalprice,
                  result[i].totalcartquantity,
                  "Not Delivered",
                  req.session.user,
                  result[i].prod_id
                ],
                (err, result) => {
                  if (err) {
                    return db.rollback(function() {
                      throw err;
                    });
                  }
                  db.query(
                    "update  product set quantity=? WHERE id=?",
                    [UpdatedQuantity, ProductId],
                    (err, result) => {
                      if (err) {
                        return db.rollback(function() {
                          throw err;
                        });
                      }
                    }
                  );
                }
              );
              db.query(
                "delete from cart where prod_id=?",
                [result[i].prod_id],
                (err, result) => {
                  if (err) {
                    return db.rollback(function() {
                      throw err;
                    });
                  }
                }
              );
            }
          }
          if (bool) {
            let display = "Sorry this product ";
            for (let i = 0; i < ProductsOutOfQuantity.length; i++) {
              // console.log(ProductsOutOfQuantity[i]);
              display += ProductsOutOfQuantity[i];
              display += ",";
            }
            display += " is out of quantity";
            if (ProductsInQuantity.length) {
              display += " and your order of this products ";
            }
            for (let i = 0; i < ProductsInQuantity.length; i++) {
              display += ProductsInQuantity[i];
              display += ",";
            }
            if (ProductsInQuantity.length) {
              display += " has been placed";
            }
            return res.render("../views/cart.ejs", {
              message: display,
              outofquantity: true,
              result: result
            });
          } else {
            db.query("delete from cart", [], (err, result) => {
              if (err) {
                return db.rollback(function() {
                  throw err;
                });
              }
            });
            return res.redirect("/submitbillinfo");
          }
        }
      );
    });
  }
};

module.exports = Purchase;
