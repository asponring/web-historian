var path = require('path');
var archive = require('../helpers/archive-helpers');
var urlParser = require('url');
var httpHelpers = require('./http-helpers.js')
var fs = require('fs');

var actions = {
  "GET": function(req, res, fileName) {
    httpHelpers.serveAssets(res, fileName, sendResponse, 200);
  },
  "POST": function(req, res){
    collectData(req, function(data) {
// TODO check if data is in LIST --- CALL Archive Helpers is URL in List
      httpHelpers.serveAssets(res, data, sendResponse, 302);
      // sendResponse(res, data, 302);
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

var collectData = function(req, callback){
  var requestData = "";
  req.on('data', function(chunk){
    requestData += chunk;
  });

  req.on('end', function() {
    archive.addUrlToList(requestData);
    callback(requestData);
  });

}







