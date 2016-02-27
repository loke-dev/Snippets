"use strict";

const mongoose  = require("mongoose");
const URL       = "mongodb://localhost/mylittledb";

module.exports =  function() {
    let db = mongoose.connect(URL);

    db.connection.on("connected", function() {
        console.log("Mongoose connection open.");
    });

    db.connection.on("error", function(err) {
        console.error("Mongoose connection error: ", err);
    });

    db.connection.on("disconnected", function() {
        console.log("Mongoose connection disconnected.");
    });

    // If the Node process ends, close the Mongoose connection.
    process.on("SIGINT", function() {
        db.connection.close(function() {
            console.log("Mongoose connection disconnected through app termination.");
            process.exit(0);
        });
    });

    return db;
};
