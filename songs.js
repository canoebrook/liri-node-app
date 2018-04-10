var dotenv  = require("dotenv").config();
var Spotify = require('node-spotify-api');
var keys    = require('./keys.js');
var log     = require("fs");

var Songs = function(song) {
   this.song = song;
   this.getSong = function(song) { 
    var spotify = new Spotify(keys.spotify); 
    spotify
      .search({ type: 'track', query: song})
      .then(function(response) {
         this.preview_url = response.tracks.items[0].preview_url;
         this.song = response.tracks.items[0].name;
         this.album = response.tracks.items[0].album.name;
         this.artist = response.tracks.items[0].album.artists[0].name;            
         console.log(this.preview_url); 
         console.log(this.song); 
         console.log(this.album);
         console.log(this.artist);
         log.appendFile("./log.txt","\n"+this.song,function(err) {if (err) {console.log(err); } });log.appendFile("./log.txt","\n"+this.album,function(err) {if (err) {console.log(err); } });log.appendFile("./log.txt","\n"+this.artist,function(err) {if (err) {console.log(err); } });log.appendFile("./log.txt","\n"+this.preview_url,function(err) {if (err) {console.log(err); } });         
      })
      .catch(function(err) {
        console.log(err);
      });

  //     client.get('statuses/user_timeline/',function(error,tweets ,response) {
  //     if (!error) {
  //       // Console log the tweets
  //       for(i=0;i<tweets.length; i++) { 
  //          console.log(tweets[i].text);
  //          log.appendFile("./log.txt","\n"+tweets[i].text,function(err) {if (err) {console.log(err); } });
  //         }
  //     } else {
  //       console.log(error);
  //       log.appendFile("./log.txt","\n"+error,function(err) {if (err) {console.log(err); } });
  //     };
  //  });
  }        
};
    
module.exports = Songs;