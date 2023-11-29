const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const authRouter = require("./routes/auth");
const categoriesRouter = require("./routes/categories");
const productsRouter = require("./routes/products");
const usersRouter = require("./routes/users");
const ordersRouter = require("./routes/orders");

const application = require("./config/application");
const database = require("./config/database");
const helmet = require("helmet");
const path = require("path");
const passport = require("passport");
const {
  createRoles,
  createAdmin,
  createUser,
  createCategories,
} = require("./migration/initialSetUp");

const app = new express();
// Boot Application
app.listen(application.port);
console.log(`Server Started at PORT ${application.port}`);
// view engine setup
// view engine setup
app.set("views", path.join(__dirname, "views")); // this is the folder where we keep our pug files
app.set("view engine", "pug"); // we use the engine pug, mustache or EJS work great too

//Register Middlewares
// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
// Passport middleware
app.use(passport.initialize());
require("./config/passport")(passport);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});
app.use(express.json())
/*------------------------*/
createRoles();
createCategories();
setTimeout(
  () => {
    createAdmin();
    createUser();
  },10000
);
/*------------------------*/

// Register Routes
//app.use("/", routes);

app.use("/api/auth", authRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/products", productsRouter);
app.use("/api/users", usersRouter);
app.use("/api/orders", ordersRouter);
// connect to database
mongoose
  .connect(database.mongoUri, { useNewUrlParser: true,useUnifiedTopology: true,useFindAndModify: false })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));
