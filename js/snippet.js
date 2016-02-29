"use strict";

const snippetDb  = require("../models/snippets");

let save = function(data, title, callback){
    let snippet = new snippetDb({
        data: data,
        title: title
    });
    snippet.save(data, function(err){
        callback(err);
    });
};

module.exports = {
    save: save
};
