"use strict";

let emitter = require("../js/emitter.js");

module.exports = function(io) {
    emitter.on("login", function(payload){
        io.emit("login", {message:payload});
        console.log(payload.message);
    });

    emitter.on("loginFailed", function(payload){
        io.emit("login", {message:payload});
        console.log(payload.message);
    });
}
