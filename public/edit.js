"use strict";

let socket = io();

let titleArea = document.querySelector(".titleArea");
titleArea.addEventListener("keydown", function(){
    socket.emit("titleArea", {message:titleArea.value});
});
titleArea.addEventListener("keyup", function(){
    socket.emit("titleArea", {message:titleArea.value});
});

let textArea = document.querySelector(".textArea");
textArea.addEventListener("keydown", function(){
    socket.emit("textArea", {message:textArea.value});
});
textArea.addEventListener("keyup", function(){
    socket.emit("textArea", {message:textArea.value});
});
