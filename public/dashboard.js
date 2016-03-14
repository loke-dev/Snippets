"use strict";

let socket = io();

function printText(data) {
    let text = document.createTextNode(data);
    let el = document.createElement("li");
    let messages = document.querySelector(".listArea");
    el.appendChild(text);
    messages.appendChild(el);
}

function printATag(data, id) {
    let text = document.createTextNode(data);
    let el = document.createElement("li");
    let aTag = document.createElement("a");
    let messages = document.querySelector(".listArea");
    let titleText = document.createTextNode("here");
    aTag.setAttribute("href", "/snippets/view/" + id);
    aTag.appendChild(titleText);
    el.appendChild(text);
    el.appendChild(aTag);
    messages.appendChild(el);
}

//Login Sucessfully
socket.on("loginSucess", function(data) {
    printText(data.username + data.message);
});

//Login Failed
socket.on("loginFailed", function(data) {
    printText(data.username + data.message);
});

//Signup with new account
socket.on("signup", function(data) {
    printText(data.username + data.message);
});

//Delete a snippet
socket.on("delete", function(data) {
    printText(data.username + data.message);
});

//Logout
socket.on("logout", function(data) {
    printText(data.username + data.message);
});

//View snippet
socket.on("viewSnippet", function(data) {
    printATag(data.username + data.message, data.id);
});

//Save snippet
socket.on("saveSnippet", function(data) {
    printATag(data.username + data.message, data.id);
});

//New snippet
socket.on("newSnippet", function(data) {
    printATag(data.username + data.message, data.id);
});
