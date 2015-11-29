var mongoose = require('mongoose');
var Bookmark = mongoose.model('Bookmark');

module.exports.list = function(req, res) {
    Bookmark.find(function(err, bookmarks) {
        if (err != null) {
            res.status(500).send({error: "Couldn't retrieved the bookmarks."});
        } else {
            res.status(200).send(bookmarks);
        }
    });
};

// We define a new route that will handle bookmark creation
module.exports.add = function(req, res) {
    var bookmark = new Bookmark();
    bookmark.title = req.body.title;
    bookmark.url = req.body.url;
    bookmark.save(function(err, bookmark) {
        if (err != null) {
            res.status(500).send("An error has occurred -- " + err);
        } else {
            res.status(201).send();
        }
    });
};

// We define another route that will handle bookmark deletion
module.exports.delete = function(req, res) {
    Bookmark.remove({_id: req.params.id}, function(err) {
        if (err != null) {
            res.status(500).send({error: "An error has occurred -- " + err});
        } else {
            res.status(200).send();
        }
    });
};