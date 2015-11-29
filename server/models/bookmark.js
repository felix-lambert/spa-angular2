
var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var BookmarkSchema = new Schema({
    url: String,
  	title: String
});

mongoose.model('Bookmark', BookmarkSchema);

