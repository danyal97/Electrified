const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const customer = require("./modules/customer");
const Home = require("./modules/Home");
const path = require("path");
const cookieParser = require("cookie-parser");
const mysql = require("mysql");
const bcrypt = require("bcrypt");
// const logger = require("morgan");
const expressValidator = require("express-validator");
const flash = require("express-flash");
const session = require("express-session");
// import * as Redis from "ioredis";
// const redis = require("redis");
// const RedisStore = require("connect-redis")(session);
const TwoHours = 10 * 60 * 60 * 2;
// const client = redis.createClient();
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

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(flash());
app.use(
  session({
    name: "sid",
    secret: "somethingnbjhjbfhagbidhgbahs",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: TwoHours, // 7 days
      sameSite: true
    }
  })
);
app.use(express.methodOverride());
// app.use(session({ secret: "danyal" }));
// app.set("views", path.join(__dirname, "../", "views"));
app.set("view engine", "ejs");
// app.use(express.static("./public"));
app.use(express.static("./views"));

app.get("/", function(req, res) {
  res.send("/ this page");
});

app.get("/home", (req, res) => {
  if (req.session.user) {
    res.send("Welcome to home");
  } else {
    res.redirect("/login");
    // login page ayega
  }
});
app.post("/login", (req, res) => {
  if (req.session.user) {
    res.redirect("/home");
  } else {
    let param = req.body;
    let query = "SELECT * from customer where email=?";
    db.query(query, [param.email], (err, result) => {
      if (err != null) {
        res.status(500).send({ error: err.message });
      }
      if (result.length > 0) {
        const match = bcrypt.compareSync(
          param.password,
          result[0].password,
          (err, res) => {
            if (err != null) {
              res.status(500).send({ error: err.message });
            }
          }
        );
        if (match) {
          req.session.user = result[0].id;
          return res.redirect("/home");
        }
      }
      return res.redirect("/login");
    });
  }
});
app.post("/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.redirect("/home");
    }
    res.clearCookie("sid");
    res.send("logout");
    // return res.redirect("/login"); get request
  });
});

app.post("/register", (req, res) => {
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
          if (error.includes("email") || error.includes("phone")) {
            res.send("This email and password already esists");
            // res.redirect("/register");
          }
        } else {
          req.session.user = result.insertId;
          // console.log(req.session.user);
          res.redirect("/home");
          // res.send("successfully registered");
        }
      }
    );
    // res.redirect("/home");
  }
});

// MY API
// app.use(Home);
// app.use(customer);

app.listen("3000", () => {
  console.log("server started at port 3000");
});
