"use strict";

const express      = require("express");
const exphbs       = require("express-handlebars");
const session      = require("express-session");
const bodyParser   = require("body-parser");
const path         = require("path");
const cookieParser = require("cookie-parser");
const mongoose     = require("./config/mongoose.js");
const login        = require("./js/login.js");
const http         = require("http");
const app          = express();


//Start the server
mongoose();

/**
 * USE and configs
**/

app.engine("hbs", exphbs({
    defaultLayout: "default",
    extname: "hbs"
}));

app.set("view engine", "hbs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, "public")));
app.use(session({
    name:   "MySweetLittleCookie",
    secret: "F303B3CD83F576E56A187D3F174BAED9",
    saveUninitialized: false,
    resave: false,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 186400
    }
}));

app.use(cookieParser());
app.use(login.checkLogin);
app.use(function(req, res, next) {
    res.locals.flash = req.session.flash;
    delete req.session.flash;
    next();
});

app.use(express.static(__dirname + "/public"));


app.use("/", require("./routes/get.js"));
app.use("/", require("./routes/post.js"));

/**
 * SOCKET
**/

let server = http.createServer(app).listen(8000, function() {
    console.log("Listening on port 8000!");
});

let io = require("socket.io")(server);

let socket = require("./js/socket.js")(io);

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
