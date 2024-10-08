require("dotenv").config();
const tienanh = require("dotenv");
tienanh.config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/user.route");
var ordersRouter = require("./routes/order.route");
const productRouter = require("./routes/product.route");
const { default: mongoose } = require("mongoose");

var app = express();

console.log("Listening on " + `${process.env.PORT}`);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/orders", ordersRouter);

app.use("/api", productRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.log("log err from error handler", err);

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  // res.status(err.status || 500);
  // res.render("error");
  return res.status(err?.status).json({
    err: {
      status: err?.status,
      message: err?.message || err,
    },
  });
});

async function connectDB() {
  // async regular function
  console.log("render 1");

  await mongoose
    .connect("mongodb://localhost:27017/tienanh")
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => {
      console.log("Cannot connetc to db", err);
    });

  console.log("render 2");
}

// async arrow function
const connectDB2 = async () => {
  console.log("render 3");
  await connectDB();
  console.log("render 4");
};

connectDB2();

module.exports = app;

// MVC
// java netbean => model, controller, view (.jsp)
// node express => model, controller => json
// client (react) - server (express)
