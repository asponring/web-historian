var path = require('path');
var archive = require('../helpers/archive-helpers');
var urlParser = require('url');
// require more modules/folders here!

var routes = {
  '/': true
};

exports.handleRequest = function (req, res) {
  // res.end(archive.paths.list);

  var parts = urlParser.parse(req.url);
  var route = routes[parts.pathname];
  if (route) {
    sendResponse(res);
  } else {
    console.log("404");
    sendResponse(res, "Not Found", 404);
  }

  // sendResponse(res);


};

var sendResponse = function(response, data, statusCode){
  statusCode = statusCode || 200;
  response.writeHead(statusCode);
  response.end();
};
