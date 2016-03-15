"use strict";

const csrf         = require("csurf");
const snippetDb    = require("../models/snippets");
const snippet      = require("../js/snippet.js");
const login        = require("../js/login.js");
const emitter      = require("../js/emitter.js");
const router       = require("express").Router();

let csrfProtection = csrf({ cookie: true });

router.get("/", function(req, res) {
    res.render("home/index");
});

router.get("/logout", login.requireUser, function(req, res){
    emitter.emit("logout", {message:" logged out!", username: req.session.username});
    delete req.session.username;
    res.redirect("/");
});

router.get("/dashboard", login.requireUser, csrfProtection, function(req, res) {
    res.render("functions/dashboard", {csrfToken: req.csrfToken()});
});

router.get("/login", csrfProtection, login.noUser, function(req, res) {
    res.render("functions/login", {csrfToken: req.csrfToken()});
});

router.get("/signup", csrfProtection, login.noUser, function(req, res){
    res.render("functions/signup", {csrfToken: req.csrfToken()});
});

router.get("/snippets", function(req, res) {
    snippetDb.find({}).then(function(snippets) {
        res.render("functions/snippets", {snippets: snippets});
    });
});

router.get("/snippets/new", csrfProtection, login.requireUser, function(req, res){
    res.render("functions/newSnippet", {csrfToken: req.csrfToken()});
});

router.get("/snippets/edit/:id", csrfProtection, login.requireUser, function(req, res){
    let id = req.params.id;
    snippet.edit(id, function(err, id, title, data) {
        if (err) {
            console.log(err);
        } else {
            emitter.emit("viewSnippet", {message:" is editing a snippet! View it ", username: req.session.username, id:id});
            res.render("functions/editSnippet", {id: id, title: title, data: data, csrfToken: req.csrfToken()});
        }
    });
});

router.get("/snippets/view/:id", csrfProtection, function(req, res){
    let id = req.params.id;
    snippet.view(id, function(err, id, title, data) {
        if (err) {
            console.log(err);
        } else {
            res.render("functions/viewSnippet", {id: id, title: title, data: data, csrfToken: req.csrfToken()});
        }
    });
});

router.get("/snippets/delete/:id", login.requireUser, function(req, res){
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

module.exports = router;
