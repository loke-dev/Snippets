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

    emitter.on("logout", function(payload){
        io.emit("logout", {message:payload.message, username:payload.username});
    });

    emitter.on("viewSnippet", function(payload){
        io.emit("viewSnippet", {message:payload.message, username:payload.username, id:payload.id});
    });

    emitter.on("saveSnippet", function(payload){
        io.emit("saveSnippet", {message:payload.message, username:payload.username, id:payload.id});
    });

    emitter.on("newSnippet", function(payload){
        io.emit("newSnippet", {message:payload.message, username:payload.username, id:payload.id});
    });

    io.on("connection", function(socket){
        socket.on("titleArea", function(data){
            io.emit("titleArea", {
                message: data.message
            });
        });

        socket.on("textArea", function(data){
            io.emit("textArea", {
                message: data.message
            });
        });
    });


};
