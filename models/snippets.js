"use strict";

let mongoose = require("mongoose");

let snippetSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    data: {
        type: String
    }
});

let snippetDb = mongoose.model("snippets", snippetSchema);

module.exports = snippetDb;
