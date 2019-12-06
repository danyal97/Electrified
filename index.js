const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const customer = require("./modules/customer");
const Home = require("./modules/Home");
const Product = require("./modules/product");
const DeliveryPerson = require("./modules/deliveryperson");
const Admin = require("./modules/admin");
const Shopping = require("./modules/shopping");
const path = require("path");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
const flash = require("express-flash");
const session = require("express-session");
const DisplayPages = require("./modules/displaypages");
const TwoHours = 10 * 60 * 60 * 2;
const StripeSecretKey = process.env.STRIPE_SECRET_KEY;
const socket = require("socket.io");
const db = require("./database");
currentpos = [];
// if (process.env.NODE_ENV !== "production") {
//   require("dotenv");
// }

// console.log(StripeSecretKey);

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
app.use(Shopping);
app.use(DisplayPages);
app.use(DeliveryPerson);

app.get("/map", (req, res) => {
  res.render("./package.ejs");
});

const server = app.listen("3000", () => {
  console.log("server started at port 3000");
});

const io = socket(server);

// io.sockets.on("connection", socket => {
//   console.log(socket.id);
// });

// io.sockets.on("position", data => {
//   console.log("danyal");
//   console.log(data);
// });

io.sockets.on("connection", function(socket) {
  // var position = [];
  socket.on("position", function(pos) {
    // console.log(pos);
    socket.broadcast.emit("packageposition", { pos: pos });
    // position.push(pos);
    // return position;
    // console.log(pos);
    socket.on("setpackageposition", function(pos) {
      console.log("setpackageposition");
      console.log(pos);
      db.query(
        "DELETE from map where d_id=? and c_id=?",
        [4, 141],
        (err, result) => {
          db.query(
            "insert into map set c_id=?,lat=?,lng=?,d_id=?",
            [141, pos.pos.lat, pos.pos.lng, 4],
            (err, result) => {}
          );
        }
      );
    });
  });

  // console.log(position);
});
