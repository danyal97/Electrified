const db = require("../database");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();
const session = require("express-session");
// const popups = require("popups");

const Purchase = (req, res) => {
  try {
    let cart;
    let success = false;
    if (req.session.user) {
      db.beginTransaction(err => {
        if (err) {
          res.status(500).send({ error: err.message });
        }
        // let query="select * from cart";
        let param = 0;

        db.query("select * from cart", [], (err, result) => {
          if (err) {
            return db.rollback(function() {
              throw err;
            });
          }
          let products = [];
          let SubtractedQuantity = 0;
          let TotalQuantity = 0;
          param = result;
          cart = result;
          // console.log(param);
          let bill = 0;
          let bool = true;
          for (let i = 0; i < param.length && bool == true; i++) {
            if (!bool) {
              break;
            }
            db.query(
              "select price*? as bill,quantity from product where id=?",
              [param[i].quantity, param[i].prod_id],
              (err, result) => {
                if (err) {
                  return db.rollback(function() {
                    throw err;
                  });
                }
                // console.log(result);
                bill = bill + result[0].bill;
                SubtractedQuantity = result[0].quantity - param[i].quantity;
                if (SubtractedQuantity < 0) {
                  console.log("SUBTRACTED QUANTITY ERROR");
                  bool = false;
                  db.query(
                    "delete from cart where prod_id=? and quantity=?",
                    [param[i].prod_id, param[i].quantity],
                    (err, result) => {
                      if (err) {
                        db.rollback(function() {
                          throw err;
                        });
                      }
                      db.query("select * from cart", [], (err, result) => {
                        return res.render("../views/cart.ejs", {
                          message: "Sorry Product is out of quantity",
                          outofquantity: true,
                          result: result
                        });
                      });
                    }
                  );
                  // return db.rollback(function() {
                  //   throw err;
                  // });
                  // console.log(SubtractedQuantity);
                  // res.redirect("/home");
                  // db.end();
                  // return res.status(400).send("<h1>some html</h1>");
                  // return res.location("back");
                  // return;
                  // return res.render("../views/cart.ejs", {
                  //   message: param[i].prod_id,
                  //   quantity: SubtractedQuantity,
                  //   result: cart
                  // });
                  // db.rollback(function() {
                  // db.query("select * from cart", [], (err, result) => {
                  //   return res.render("../views/cart.ejs", {
                  //     message: "Sorry Product is out of quantity",
                  //     quantity: false,
                  //     result: result
                  //   });
                  // });

                  //   // req.flash('Soryy')
                  //   //   throw err;
                  // });
                } else {
                  db.query(
                    "update  product set quantity=? WHERE id=?;",
                    [SubtractedQuantity, param[i].prod_id],
                    (err, result) => {
                      if (err) {
                        // console.log(result);
                        return db.rollback(function() {
                          throw err;
                        });
                      }

                      db.query(
                        "INSERT INTO  myorder set bill=?,quantity=?,deliverystatus=?,customerid=?,productid=?",
                        [
                          bill,
                          param[i].quantity,
                          "Not Delivered",
                          req.session.user,
                          param[i].prod_id
                        ],
                        (err, result) => {
                          if (err) {
                            return db.rollback(function() {
                              throw err;
                            });
                          }
                          db.query("delete from cart", [], (err, result) => {
                            if (err) {
                              return db.rollback(function() {
                                throw err;
                              });
                            }
                          });
                          // res.render("../views/cart.ejs");
                        }
                        // db.commit(func)
                      );
                    }
                  );
                }
                // TotalQuantity=TotalQuantity+param.items[i].quantity;
                // console.log(result[0].bill);
                // console.log(bill);
                // products.push();
              }
            );
            // console.log(products);
          }
          db.commit(function(err) {
            if (err) {
              // return db.rollback(function() {
              //   throw err;
              // });
            }
            success = true;
            // return res.render(
            //   "../views/billinginformation.ejs"
            // );
            return res.redirect("/submitbillinfo");
            // console.log("success");
            // res.render("../views/homeloggedin.ejs");
            // console.log("Transaction Complete");
            // db.end();
          });
        });
        // console.log("PARAM" + param[0]);

        // db.query('INSERT INTO  myorder set bill=?,quantity=?,deliverystatus=?,customerid=?,productid=?',[bill,TotalQuantity,"Not Delivered",req.session.user,]);
        // console.log(products);
        // db.query();
      });

      // return res.render("../views/cart.ejs", {
      //   message: "PRODUCT OUT OF QUANTITY",
      //   quantity: true
      //   // result: cart
      // });
      // let param = req.body;
      // console.log(param);
    }
    console.log("SUCESSS " + success);
    // if (success) {

    // }
    // if (!success) {
    // }
  } catch (e) {
    // Console.log(e);
    // db.query("select * from cart", [], (err, result) => {
    //   return res.render("../views/cart.ejs", {
    //     message: "Sorry Product is out of quantity",
    //     outofquantity: true,
    //     result: result
    //   });
    // });
    // return res.render("../views/cart.ejs", {
    //   message: "PRODUCT OUT OF QUANTITY",
    //   quantity: true
    //   // result: cart
    // });
    // res.render("../views/homeloggedin.ejs");
    // res.render("/home");
  }
};

module.exports = Purchase;
