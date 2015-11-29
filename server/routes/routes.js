/*
 * Module dependencies
 */
var _             = require('underscore');
var path          = require('path');
var express       = require('express');

/**
 * Expose routes
 */
var router = express.Router();

/**
 * Defines routes for application
 */
module.exports = function(app) {
  console.log('********************************routes*************************************');
  var bookmarkRoutes = require('./bookmarks/bookmarkRoute');
  var routes = bookmarkRoutes;

  _.each(routes, function(route) {
    var args = _.flatten([route.path, route.middleware]);
    switch (route.httpMethod.toUpperCase()) {
      case 'GET':
        app.get.apply(app, args);
        break;
      case 'POST':
        app.post.apply(app, args);
        break;
      case 'PUT':
        app.put.apply(app, args);
        break;
      case 'DELETE':
        app.delete.apply(app, args);
        break;
      default:
        throw new Error('Invalid HTTP method specified for route ' +
            route.path);
    }
  });
};
