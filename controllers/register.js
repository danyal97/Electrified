const db = require("../database");
const bcrypt = require("bcrypt");

const RegisterCustomer = (req, res) => {
  if (req.session.user) {
    res.redirect("/home");
  } else {
    let param = req.body;
    let query =
      "Insert into customer(password,email,address,gender,phone,fullname) values (?,?,?,?,?,?);";
    db.query(
      query,
      [
        bcrypt.hashSync(param.password, 10),
        param.email,
        param.address,
        param.gender,
        param.phone,
        param.fullname
      ],
      (err, result) => {
        if (err != null) {
          let error = err.message;
          console.log(error);
          if (error.includes("email")) {
            return res.render("../views/signup", {
              email: true,
              phone: false,
              message: "This email already exist"
            });
            // res.send("This email and password already esists");
            // res.redirect("/register");
          }
          if (error.includes("phone")) {
            return res.render("../views/signup", {
              phone: true,
              email: false,
              message: "This phone number already exist"
            });
          }
        } else {
          req.session.user = result.insertId;
          return res.redirect("/");
        }
      }
    );
  }
};
module.exports = RegisterCustomer;
