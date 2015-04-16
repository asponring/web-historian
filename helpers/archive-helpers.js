var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback){
  fs.readFile(exports.paths.list, "utf-8", function(err, content) {
    if (err) {
      throw new Error(err.message);
    } else {

      callback(content.split('\n'));
    }
  });
};

exports.isUrlInList = function(target, callback){

  // var isInThis;
  exports.readListOfUrls(function(array) {
    console.log(array, target);
    callback(array.indexOf(target) > -1);

    // console.log("in cb " + isInThis);
  });

  // console.log("outside cb " + isInThis);
  // return isInThis;
};

exports.addUrlToList = function(data){
 data = data.substring(4) + '\n';
  fs.appendFile(exports.paths.list, data, function (err) {
    if (err) throw err;
  });
};

exports.isURLArchived = function(){
};

exports.downloadUrls = function(){
};
