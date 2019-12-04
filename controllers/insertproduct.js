const db = require("../database");

const InsertProduct = (req, res) => {
  if (req.session.admin) {
    let param = req.body;
    let query =
      "Insert into product(name,quantity,image_src,description,price,brand_name,productcategory_name) values (?,?,?,?,?,?,?);";
    db.query(
      query,
      [
        param.name,
        param.quantity,
        param.image_src,
        param.description,
        param.price,
        param.brand_name,
        param.productcategory_name
      ],
      (err, result) => {
        if (err != null) {
          let error = err.message;
          // console.log(error);
          if (error.includes("name")) {
            res.send("This name already esists");
          }
        } else {
          // console.log(result.insertId);
          // req.session.user = result.insertId;
          res.redirect("/product");
        }
      }
    );
  }
  res.redirect("/product");
};
module.exports = InsertProduct;
