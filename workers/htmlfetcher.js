var archive = require('../helpers/archive-helpers');
var async = require('async');
// eventually, you'll have some code here that uses the code in `archive-helpers.js`
// to actually download the urls you want to download.

var htmlFetcher = function() {
  archive.readListOfUrls(function(array) {
    array.pop();
    async.each(array, function(site){
      archive.isURLArchived(site, function(isArchived){
        if(!isArchived) {
          archive.downloadUrls(site);
        }
      });
    });
  });
};

htmlFetcher();
