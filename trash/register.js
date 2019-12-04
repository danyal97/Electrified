const db = require("../database");
const bcrypt = require("bcrypt");

const RegisterCustomer = (req, res) => {
  let param = req.body;
  console.log(typeof param.phone);
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
        if (error.includes("email") && error.includes("phone")) {
          // return res.render("../views/signup.ejs", {
          //   email: true,
          //   phone: false,
          //   message: "This email already exist"
          // });
        }
        // if (error.includes("phone")) {
        //   // return res.render("../views/signup.ejs", {
        //   //   phone: true,
        //   //   email: false,
        //   //   message: "This phone number already exist"
        //   // });
        // }
        // db.release();
      }
      // return res.json(true);
      // db.release();
      req.session.userId = result[0].email;
    }
  );
  return res.redirect("/register");
};

module.exports = RegisterCustomer;
