const db = require("../database");

const InsertBillInfo = (req, res) => {
  if (req.session.user) {
    let param = req.body;
    console.log("BILLING INFO" + param.zipcode);
    let query =
      "Insert into billinginformation(zipcode,houseno,city,cnic,cust_id) values (?,?,?,?,?);";
    db.query(
      query,
      [param.zipcode, param.houseno, param.city, param.cnic, req.session.user],
      (err, result) => {
        if (err != null) {
          let error = err.message;
          // console.log(error);
        } else {
          // console.log(result.insertId);
          // req.session.user = result.insertId;
          res.redirect("/home");
        }
      }
    );
  }
  // res.redirect("/home");
};
module.exports = InsertBillInfo;
