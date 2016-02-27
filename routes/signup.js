"use strict";

const router = require("express").Router();
const mongo  = require("../config/mongoose");

router.route("/signup")
    .get(function(req, res) {
        res.render("/functions/signup");
    })
    .post(function(req, res, next) {


    let username        = req.body.username;
    let password        = req.body.password;
    let passwordConfirm = req.body.passwordConfirm;
    let query           = {username: username};
    let userObject      = {username: username, password: password};
    let users           = mongo.collection("users");

    console.log(users);

    if (password !== passwordConfirm) {
        let err = "The passwords do not match";
        res.render("functions/signup", {error: err});
    } else {
        users.findOne(query, function(err, user){
          if (user) {
            err = "The username you entered already exists";
            res.render("functions/signup", err);
          } else {
            users.insert(userObject, function(err,user){
              console.log("HEJJA!!!");
            });
          }
        });
    }



    next(err);
    });

module.exports = router;
