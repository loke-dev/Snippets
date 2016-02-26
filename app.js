"use strict";

const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
const mongoose = require("./config/mongoose.js");

//Start the server
mongoose();

app.engine("hbs", exphbs({
    defaultLayout: "default",
    extname: "hbs"
}));

app.set("view engine", "hbs");

app.get("/", function(req, res) {
    res.render("home/index");
    console.log("HEMMMA!!");
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
