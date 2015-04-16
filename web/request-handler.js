var path = require('path');
var archive = require('../helpers/archive-helpers');
var urlParser = require('url');
var fs = require('fs');

var actions = {
  "GET": function(req, res, fileName) {
    console.log(fileName);
    fs.readFile( fileName, function(err, content) {
      if(err) {
        sendResponse(res, err.messge, 404);
      } else {
        sendResponse(res, content, 200);
      }
    });
  }
};

exports.handleRequest = function (req, res) {
  var fileName = urlParser.parse(req.url).pathname;
  if(fileName === '/') {
    fileName = archive.paths.siteAssets +'/index.html';
  } else {
    fileName = archive.paths.archivedSites + fileName;
  }

  var action = actions[req.method];
  if(action) {
    action(req, res, fileName);
  }
};



var sendResponse = function(response, data, statusCode){
  statusCode = statusCode || 200;
  response.writeHead(statusCode);
  response.end(data);
};
