"use strict";

let emitter = require("../js/emitter.js");

module.exports = function(io) {
    emitter.on("loginSucess", function(payload){
        io.emit("loginSucess", {message:payload.message, username:payload.username});
    });

    emitter.on("loginFailed", function(payload){
        io.emit("loginFailed", {message:payload.message, username:payload.username});
    });

    emitter.on("signup", function(payload){
        io.emit("signup", {message:payload.message, username:payload.username});
    });

    emitter.on("delete", function(payload){
        io.emit("delete", {message:payload.message, username:payload.username});
    });
};
