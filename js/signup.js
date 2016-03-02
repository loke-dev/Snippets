"use strict";

const usersDb  = require("../models/users");
const bcrypt   = require("bcrypt-nodejs");

let createUser = function(username, password, passwordConfirm, callback){
  if (password !== passwordConfirm) {
    let err = "The passwords do not match!";
    callback(err);
  } else {
    let findUser   = {username:username};
    let userObject = {username: username, password: password};
    bcrypt.genSalt(10, function(err, salt) {
        if (err) {
            callback(err);
        } else {
              usersDb.findOne(findUser, function(err, user){
                if (user) {
                    err = "The username you entered is already in use!";
                    callback(err);
                } else {
                bcrypt.hash(password, salt, null, function(err, hash) {
                    let userDb = new usersDb({
                        username: username,
                        password: hash
                    });
                    userDb.save(userObject, function(err, user){
                        callback(err, user);
                    });
                });
              }
            });
        }
    });
  }
};


module.exports = {
    createUser:createUser
};
