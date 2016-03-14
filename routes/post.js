"use strict";

const csrf         = require("csurf");
const signup       = require("../js/signup.js");
const snippet      = require("../js/snippet.js");
const login        = require("../js/login.js");
const emitter      = require("../js/emitter.js");
const router       = require("express").Router();

let csrfProtection = csrf({ cookie: true });


router.post("/login", login.noUser, csrfProtection, function(req, res){
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

router.post("/signup", login.noUser, csrfProtection, function(req, res){
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

// app.post("/snippets/save", login.requireUser, csrfProtection, function(req, res){
//     let data  = req.body.data;
//     let title = req.body.title;
//
//     snippet.save(data, title, function(err){
//         if (err) {
//             res.render("functions/snippets", {flash: err});
//         } else {
//             console.log("Your snippet was successfully saved!");
//             req.session.flash = ("Your snippet was successfully saved!");
//
//             res.redirect("/snippets");
//         }
//     });
// });

router.post("/snippets/new", login.requireUser, csrfProtection, function(req, res){
    let data  = req.body.data;
    let title = req.body.title;

    snippet.save(data, title, function(err, payload){
        if (err) {
            res.render("functions/snippets", {flash: err});
        } else {
            console.log("Your snippet was successfully created!");
            req.session.flash = ("Your snippet was successfully created!");
            emitter.emit("newSnippet", {message:" has created a new snippet! View it ", username: req.session.username, id: payload._id});
            res.redirect("/snippets");
        }
    });
});

router.post("/snippets/edit/:id", login.requireUser, csrfProtection, function(req, res){
    let data  = req.body.data;
    let title = req.body.title;
    let id    = req.params.id;

    snippet.update(id, title, data, function(err){
        if (err) {
            res.render("functions/snippets", {flash: err});
        } else {
            console.log("Your snippet was successfully updated!");
            req.session.flash = ("Your snippet was successfully updated!");
            emitter.emit("saveSnippet", {message:" has saved a edited snippet! View it ", username: req.session.username, id: id});
            res.redirect("/snippets");
        }
    });
});

module.exports = router;
