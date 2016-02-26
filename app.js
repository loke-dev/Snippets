"use strict";

var express = require("express");
var exphbs = require("express-handlebars");
var app = express();

app.engine("hbs", exphbs({
    defaultLayout: "default",
    extname: "hbs"
}));

app.set("view engine", "hbs");

app.get("/", function(req, res) {
    res.render("home/index");
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

app.listen(3015, function() {
    console.log("Example app listening on port 3015!");
});
