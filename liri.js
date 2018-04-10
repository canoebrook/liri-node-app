// import the required stuff
var dotenv  = require("dotenv").config();
var request = require('request');
var log     = require("fs");
var justDoIt= require("fs");
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var keys    = require('./keys.js');


var cmd  = process.argv[2]
var srch = process.argv[3];

// Log the Liri Command
if (process.argv[2]) {
  logit("LIRI: "+process.argv[2]+":"+process.argv[3]);
};


switch (cmd) {
  case 'do-what-it-says':
     justDoIt.readFile("./random.txt", "utf8", function(error, data, arf) {
     // If the code experiences any errors it will log the error to the console.
        if (error) {
          return console.log(error);
        }
        var dataArr = data.split(",");
        cmd=dataArr[0];
        srch=dataArr[1];
        if (cmd==='my-tweets') {
          var Tweets = require("./tweets");
          var twitter = new Tweets();
          twitter.getTweets();
        };
        if (cmd==='movie-this') {
          if (!srch) { 
            srch = "Mr. Nobody"}; 
          var Movie = require("./movie");
          var movie = new Movie(srch);
          movie.getMovie(srch);              
        };       
        if (cmd==='spotify-this-song') {
          var Songs = require("./songs");
          if (!srch) { srch = "The Sign"};
          var song = new Songs(srch);
          song.getSong(srch);     
        }
      });
     break;
  case 'my-tweets':
     // set TWITTER_SCREEN_NAME in the .env
     var Tweets = require("./tweets");
     var twitter = new Tweets();
     twitter.getTweets();
     break; 
  case 'spotify-this-song':
    var Songs = require("./songs");
     if (!srch) { srch = "The Sign"};
     var song = new Songs(srch);
     song.getSong(srch);
     break; 
  case 'movie-this':
      if (!srch) { 
        srch = "Mr. Nobody"};
       
      var Movie = require("./movie");
      var movie = new Movie(srch);
      movie.getMovie(srch);
      break;
  default: 
      response = "ERROR: I'm sorry, I don't know that.";
      logit(response);
      console.log(response);
};

// function used to log command and results
function logit(textToLog) {
  log.appendFile("./log.txt","\n"+textToLog, function(err) {
   // If an error console log it...
   if (err) {
     console.log(err);
     }
  });
  return;    
};