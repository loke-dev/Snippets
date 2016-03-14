"use strict";

const snippetDb  = require("../models/snippets");


let save = function(data, title, callback) {
    let snippet = new snippetDb({
        data: data,
        title: title
    });
    snippet.save(data, function(err, payload) {
        if (err) {
            callback(err);
        } else {
            callback(null, payload);
        }
    });
};

let del = function(id, callback) {
    snippetDb.findByIdAndRemove(id, function (err, doc) {
       if (err) {
           callback(err, null);
       } else {
           callback(err, doc);
       }
    });
};

let edit = function(id, callback) {
    snippetDb.findById(id, function(err, doc) {
        let id    = doc.id;
        let title = doc.title;
        let data  = doc.data;

        if (err) {
           callback(err, null, null, null);
       } else {
           callback(err, id, title, data);
       }
    });
};

let view = function(id, callback) {
    snippetDb.findById(id, function(err, doc) {
        let id    = doc.id;
        let title = doc.title;
        let data  = doc.data;

        if (err) {
           callback(err, null, null, null);
       } else {
           callback(err, id, title, data);
       }
    });
};

let update = function(id, title, data, callback) {
    let obj = {
        data: data,
        title: title
    };
    snippetDb.findByIdAndUpdate(id, obj, function(err, snippet) {
        if (err) {
           callback(err, null);
       } else {
           callback(null, snippet);
       }
    });
};







module.exports = {
    save: save,
    del: del,
    edit: edit,
    view: view,
    update: update
};
