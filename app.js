"use strict";

const express    = require("express");
const exphbs     = require("express-handlebars");
const session     = require("express-session");
const bodyParser = require("body-parser");
const path       = require("path");
const mongoose   = require("./config/mongoose.js");
const signup     = require("./js/signup.js");
const login      = require("./js/login.js");
const usersDb    = require("./models/users");
const app        = express();

//Start the server
mongoose();

app.engine("hbs", exphbs({
    defaultLayout: "default",
    extname: "hbs"
}));

app.set("view engine", "hbs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(session({
    name:   "TEEEEEST",
    secret: "OMGTHISISSOSECRET",
    saveUninitialized: false,
    resave: false
}));

app.use(login.checkLogin);


app.get("/", function(req, res) {
    res.render("home/index");
});


app.get("/", function(req, res){
  usersDb.find().toArray(function(err, users){
    console.log(users);
    res.render("home/index", {users:users.users});
  });
});

app.get("/logout", function(req, res){
  delete req.session.username;
  res.redirect("/");
});

app.get("/login", function(req, res) {
  res.render("functions/login");
});

app.get("/signup", function(req,res){
  res.render("functions/signup");
});

app.post("/login", function(req, res){
  let username = req.body.username;
  let password = req.body.password;

  login.checkUser(username, password, function(err, user){
    if (user) {
        console.log("You logged in with the username: " + user.username);
        req.session.username = user.username;
        res.redirect("/");
    } else {
        res.render("functions/login", {error: true});
    }
  });
});

app.post("/signup", function(req, res){
  let username        = req.body.username;
  let password        = req.body.password;
  let passwordConfirm = req.body.passwordConfirm;

  signup.createUser(username, password, passwordConfirm, function(err, user){
    if (err) {
      res.render("functions/signup", {error: err});
    } else {
      console.log("You registered with the username: " + user.username + "!");
      res.redirect("/");
    }
  });
});



/**
 * Error handling!
**/
app.use(function(err, req, res, next) {
    if (err.status !== 400) {
        return next(err);
    }
    console.error(err.stack);
    res.status(400).render("error/400");
});

app.use(function(error, req, res, next) {
    res.status(500).render("error/500");
});

//KEEP LAST!!!
app.get("*", function(req, res){
    res.status(404).render("error/404");
});

app.listen(8000, function() {
    console.log("Example app listening on port 8000!");
});
