const db = require("../database");
const bcrypt = require("bcrypt");

const RegisterAdmin = (req, res) => {
  if (req.session.admin) {
    res.redirect("/admin");
  } else {
    let param = req.body;
    let query =
      "Insert into admin(password,email,address,gender,phone,fullname) values (?,?,?,?,?,?);";
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
          if (error.includes("email") || error.includes("phone")) {
            res.send("This email and password already esists");
          }
        } else {
          req.session.admin = result.insertId;
          return res.redirect("/admin");
        }
      }
    );
  }
};
module.exports = RegisterAdmin;
