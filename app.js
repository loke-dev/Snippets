"use strict";

const express    = require("express");
const exphbs     = require("express-handlebars");
const bodyParser = require("body-parser");
const path       = require("path");
const mongoose   = require("./config/mongoose.js");
const signup     = require("./js/signup.js");
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


app.get("/", function(req, res) {
    res.render("home/index");
});

app.get("/login", function(req, res) {
  res.render("login");
});

app.get("/signup", function(req,res){
  res.render("functions/signup");
});

//app.use("/signup", require("./routes/signup.js"));


app.post("/signup", function(req, res){
  let username = req.body.username;
  let password = req.body.password;
  let passwordConfirm = req.body.passwordConfirm;

  signup.createUser(username, password, passwordConfirm, function(err, user){
    if (err) {
      res.render("functions/signup", {error: err});
    } else {
      req.session.username = user.username;
      console.log("You registered!");
      res.redirect("/");
    }
  });
});



/**
 * Error handling!
**/
app.use(function(error, req, res, next) {
    res.render("error/500");
});

//KEEP LAST!!!
app.get("*", function(req, res){
    res.render("error/404");
});

app.listen(8000, function() {
    console.log("Example app listening on port 8000!");
});
