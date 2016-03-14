"use strict";

let socket = io();

function print(data) {
    var text = document.createTextNode(data),
        el = document.createElement("li"),
        messages = document.querySelector(".listArea");
    el.appendChild(text);
    messages.appendChild(el);
}

//Login Sucessfully
socket.on("loginSucess", function(data) {
    print(data.username + data.message);
});

//Login Failed
socket.on("loginFailed", function(data) {
    print(data.username + data.message);
});

//Signup with new account
socket.on("signup", function(data) {
    print(data.username + data.message);
});

//Delete a snippet
socket.on("delete", function(data) {
    print(data.username + data.message);
});
