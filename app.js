"use strict";

const express      = require("express");
const exphbs       = require("express-handlebars");
const session      = require("express-session");
const bodyParser   = require("body-parser");
const path         = require("path");
const csrf         = require("csurf");
const cookieParser = require("cookie-parser");
const mongoose     = require("./config/mongoose.js");
const signup       = require("./js/signup.js");
const snippetDb    = require("./models/snippets");
const snippet      = require("./js/snippet.js");
const login        = require("./js/login.js");
const http         = require("http");
const emitter      = require("./js/emitter.js");
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
app.use(express.static(path.join(__dirname, "public")));
app.use(session({
    name:   "MySweetLittleCookie",
    secret: "F303B3CD83F576E56A187D3F174BAED9",
    saveUninitialized: false,
    resave: false,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 86400
    }
}));

let csrfProtection = csrf({ cookie: true });

app.use(cookieParser());
app.use(login.checkLogin);
app.use(function(req, res, next) {
    res.locals.flash = req.session.flash;
    delete req.session.flash;
    next();
});

app.use(express.static(__dirname + "/public"));

/**
 * GETS
**/

app.get("/", function(req, res) {
    res.render("home/index");
});

app.get("/logout", login.requireUser, function(req, res){
    delete req.session.username;
    res.redirect("/");
});

app.get("/dashboard", csrfProtection, function(req, res) {
    res.render("functions/dashboard", {csrfToken: req.csrfToken()});
});

app.get("/login", csrfProtection, login.noUser, function(req, res) {
    res.render("functions/login", {csrfToken: req.csrfToken()});
});

app.get("/signup", csrfProtection, login.noUser, function(req, res){
    res.render("functions/signup", {csrfToken: req.csrfToken()});
});

app.get("/snippets", function(req, res) {
    snippetDb.find({}).then(function(snippets) {
        res.render("functions/snippets", {snippets: snippets});
    });
});

app.get("/snippets/new", csrfProtection, login.requireUser, function(req, res){
    res.render("functions/newSnippet", {csrfToken: req.csrfToken()});
});

app.get("/snippets/edit/:id", csrfProtection, login.requireUser, function(req, res){
    let id = req.params.id;
    snippet.edit(id, function(err, id, title, data) {
        if (err) {
            console.log(err);
        } else {
            res.render("functions/editSnippet", {id: id, title: title, data: data, csrfToken: req.csrfToken()});
        }
    });
});

app.get("/snippets/delete/:id", login.requireUser, function(req, res){
    let id = req.params.id;
    snippet.del(id, function(err){
        if (err) {
            req.session.flash = (err);
            res.redirect("/snippets");
        } else {
            req.session.flash = ("Snippet sucessfully deleted from the database!");
            emitter.emit("delete", {message:" deleted a snippet!", username: req.session.username});
            res.redirect("/snippets");
        }
    });

});

/**
 * POSTS
**/

app.post("/login", login.noUser, csrfProtection, function(req, res){
    let username = req.body.username.toLowerCase();
    let password = req.body.password;

  login.checkUser(username, password, function(err, user){
    if (user) {
        console.log("You logged in with the username: " + user.username);
        req.session.username = user.username;
        req.session.flash = ("Welcome " + user.username);
        emitter.emit("loginSucess", {message:" logged in sucessfully!", username: user.username});
        res.redirect("/");
    } else {
        emitter.emit("loginFailed", {message:" tried log in but failed.", username: username});
        req.session.flash = "The login information you entered is not correct!";
        res.redirect("/login");
    }
  });
});

app.post("/signup", login.noUser, csrfProtection, function(req, res){
    let username        = req.body.username.toLowerCase();
    let password        = req.body.password;
    let passwordConfirm = req.body.passwordConfirm;

    signup.createUser(username, password, passwordConfirm, function(err, user){
        if (err) {
            res.render("functions/signup", {flash: err});
        } else {
            console.log("You registered with the username: " + user.username + "!");
            req.session.flash = ("You have successfully created the account: " + user.username + ", you can now log in!");
            emitter.emit("signup", {message:" has created a new account!", username:user.username});
            res.redirect("/");
        }
    });
});

app.post("/snippets/save", login.requireUser, csrfProtection, function(req, res){
    let data  = req.body.data;
    let title = req.body.title;

    snippet.save(data, title, function(err){
        if (err) {
            res.render("functions/snippets", {flash: err});
        } else {
            console.log("Your snippet was successfully saved!");
            req.session.flash = ("Your snippet was successfully saved!");
            res.redirect("/snippets");
        }
    });
});

app.post("/snippets/edit/:id", login.requireUser, csrfProtection, function(req, res){
    let data  = req.body.data;
    let title = req.body.title;
    let id    = req.params.id;

    snippet.update(id, title, data, function(err){
        if (err) {
            res.render("functions/snippets", {flash: err});
        } else {
            console.log("Your snippet was successfully updated!");
            req.session.flash = ("Your snippet was successfully updated!");
            res.redirect("/snippets");
        }
    });
});

/**
 * SOCKET
**/

let server = http.createServer(app).listen(8000, function() {
    console.log("Listening on port 8000!");
});

let io = require("socket.io")(server);

let socket = require("./js/socket.js")(io);



//io.on("connection", function(socket){
//
//});

//io.on("disconnect",function(socket){
//    console.log("A user has disconnected");
//});



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
