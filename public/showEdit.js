"use strict";

let socket = io();

function showEditTitle(data) {
    let titleArea = document.querySelector(".titleArea");
    titleArea.value = data;
}

function showEditText(data) {
    let textArea = document.querySelector(".textArea");
    textArea.value = data;
}

//Show live edit title
socket.on("titleArea", function(data) {
    console.log(data);
    showEditTitle(data.message);
});

//Show live edit text
socket.on("textArea", function(data) {
    console.log(data);
    showEditText(data.message);
});
