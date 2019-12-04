const mysql = require("mysql");

var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "danyal",
  database: "ecommerce"
});

db.connect(err => {
  if (err) {
    if (err != null) console.log({ error: err.message });
  }
  console.log("Database Connected");
});

module.exports = db;
