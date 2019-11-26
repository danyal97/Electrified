const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const customer = require("./modules/customer");
const Home = require("./modules/Home");
const Product = require("./modules/product");
const Admin = require("./modules/admin");
const path = require("path");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
const flash = require("express-flash");
const session = require("express-session");
const TwoHours = 10 * 60 * 60 * 2;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
// app.use(flash());
app.use(
  session({
    name: "sid",
    secret: "somethingnbjhjbfhagbidhgbahs",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 90000000, // 7 days
      sameSite: true
    }
  })
);
// app.use(session({ secret: "danyal" }));
// app.set("views", path.join(__dirname, "../", "views"));
app.set("view engine", "ejs");
// app.use(express.static("./public"));
app.use(express.static("./views"));

// MY API
app.use(Home);
app.use(customer);
app.use(Product);
app.use(Admin);

app.listen("3000", () => {
  console.log("server started at port 3000");
});
