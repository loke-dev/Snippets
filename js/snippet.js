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

let del = function(id, callback){
    snippetDb.findByIdAndRemove(id, function (err, doc){
       if (err) {
           callback(err, null);
       } else {
           callback(err, doc);
       }
    });
};


module.exports = {
    save: save,
    del: del
};
