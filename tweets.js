var dotenv  = require("dotenv").config();
var Twitter = require('twitter');
var keys    = require('./keys.js');
var log     = require("fs");

var Tweets = function() {
   this.getTweets = function() { 
    var client = new Twitter(keys.twitter); 
    client.get('statuses/user_timeline/',function(error,tweets ,response) {
      if (!error) {
        // Console log the tweets
        for(i=0;i<tweets.length; i++) { 
           console.log(tweets[i].text);
           log.appendFile("./log.txt","\n"+tweets[i].text,function(err) {if (err) {console.log(err); } });
          }
      } else {
        console.log(error);
        log.appendFile("./log.txt","\n"+error,function(err) {if (err) {console.log(err); } });
      };
   });
  }        
};
    
module.exports = Tweets;