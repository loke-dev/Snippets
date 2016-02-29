"use strict";

const snippetDb  = require("../models/snippets");

let save = function(data, callback){
    let snippet = new snippetDb({
        data: data
    });
    snippet.save(data, function(err){
        callback(err);
    });
};


module.exports = {
    save: save
};
