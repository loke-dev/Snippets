"use strict";

let mongoose = require("mongoose");

let usersSchema = new mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
});

let usersDb = mongoose.model("users", usersSchema);

module.exports = usersDb;
