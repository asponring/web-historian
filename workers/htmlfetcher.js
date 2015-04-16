var archive = require('../helpers/archive-helpers');
// eventually, you'll have some code here that uses the code in `archive-helpers.js`
// to actually download the urls you want to download.


// every minute, wake up


// read list of urls
    // check for matching files in directory
      // if not in directory, queue for download


var htmlFetcher = function() {
  // archive.isURLArchived("www.test.com", function(isInDir) {
  //   console.log(isInDir);
  // });

  archive.readListOfUrls(function(array) {
    for(var i =0; i < array.length-1; i++){
      archive.isURLArchived(array[i], function(isArchived){
        if(!isArchived) {
          console.log("SAVE DIS FILE!!");
        } else {
          console.log("SERVE THIS FILE!");
        }
      });
    }
  });
  //read the whole list of urls from sites.txt
    //in callback: archives.isURLArchived(url, callback)
      //if false, save the site


};

htmlFetcher();
// archive.addUrlToList("cron ran");
