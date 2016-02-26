"use strict";

const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("./config/mongoose.js");
const app = express();

//Start the server
mongoose();

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

app.listen(8000, function() {
    console.log("Example app listening on port 8000!");
});
