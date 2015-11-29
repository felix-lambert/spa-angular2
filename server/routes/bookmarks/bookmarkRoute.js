/*
 * Module dependencies
 */
var path          = require('path');
var BookmarkCtrl = require('../../controllers/bookmarks/bookmarkController');

/**
 * Defines routes for application
 */
var routes = [{
    path: '/api/bookmarks',
    httpMethod: 'POST',
    middleware: [BookmarkCtrl.add]
}, {
    path: '/api/bookmarks',
    httpMethod: 'GET',
    middleware: [BookmarkCtrl.list]
}, {
    path: '/api/bookmarks/:id',
    httpMethod: 'DELETE',
    middleware: [BookmarkCtrl.delete]
}];

module.exports = routes;