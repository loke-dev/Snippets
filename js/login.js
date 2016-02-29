"use strict";

const usersDb = require("../models/users");

let checkUser = function(username, password, callback){
  usersDb.findOne({username: username, password:password}, function(err, user){
    callback(err, user);
  });
};


let checkLogin = function(req, res, next){
  if (req.session.username) {
    usersDb.findOne({username: req.session.username}, function(err, user){
      if (user) {
        req.user = user;
        res.locals.user = user;
      }
      next();
    });
  } else {
    next();
  }
};


let requireUser = function(req, res, next){
    if (!req.user) {
        res.status(403).render("error/403");
    } else {
        next();
    }
};



module.exports = {
    checkUser: checkUser,
    checkLogin: checkLogin,
    requireUser: requireUser
};
