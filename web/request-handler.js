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
      console.log("Collected Data");
      // Branch - either serve page or redirect to loading
      data = data.substring(4);
      archive.isUrlInList(data, function(isInList){
        if (isInList) {
          httpHelpers.serveAssets(res, archive.paths.archivedSites + "/" + data, sendResponse, 302);
        } else {
          archive.addUrlToList(data);
          httpHelpers.serveAssets(res, archive.paths.siteAssets + '/loading.html', sendResponse, 302);
        }
      });
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
    callback(requestData);
  });

}







