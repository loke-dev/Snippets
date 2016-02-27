"use strict";

const mongo  = require("./config/mongoose.js");

let createUser = function(username, password, passwordConfirm, callback){
  let users = mongo.collection("users");

  if (password !== passwordConfirm) {
    let err = "The passwords do not match";
    callback(err);
  } else {
    let query      = {username:username};
    let userObject = {username: username, password: password};

    users.findOne(query, function(err, user){
      if (user) {
        err = "The username you entered already exists";
        callback(err);
      } else {
        users.insert(userObject, function(err,user){
          callback(err,user);
        });
      }
    });
  }
}


module.exports = {
    createUser:createUser
};
