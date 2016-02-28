"use strict";

const mongo      = require("../config/mongoose.js");
const users = require("../models/users");

let createUser = function(username, password, passwordConfirm, callback){

  if (password !== passwordConfirm) {
    let err = "The passwords do not match!";
    callback(err);
  } else {
    let query      = {username:username};
    let userObject = {username: username, password: password};

    users.findOne(query, function(err, user){
      if (user) {
        err = "The username you entered already exists in the database!";
        callback(err);
      } else {
        let userDb = new users({
            username: username,
            password: password
        });

        userDb.save(userObject, function(err,user){
          callback(err,user);
        });
      }
    });
  }
};


module.exports = {
    createUser:createUser
};
