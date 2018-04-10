var request = require('request');
var log     = require("fs");


var Movie = function(title) {
   this.title = title;
   this.getMovie = function(title) { 
      request("http://www.omdbapi.com/?t="+this.title+"&y=&plot=short&apikey=trilogy", function(error, response, body) {

    // If the request is successful (i.e. if the response status code is 200)
      if (!error && response.statusCode === 200) {
            /* Title of the movie.
              * Year the movie came out.
              * IMDB Rating of the movie.
              * Rotten Tomatoes Rating of the movie.
              * Country where the movie was produced.
              * Language of the movie.
              * Plot of the movie.
              * Actors in the movie.
              */
        var movie1      = JSON.parse(body);
        this.title      = movie1.Title;
        this.year       = movie1.Year;
        this.imdbRating = movie1.imdbRating;
        this.rotten     = movie1.Ratings.filter(function(obj) 
            {return obj.Source == "Rotten Tomatoes";})[0].Value;
        this.country    = movie1.Country;
        this.language   = movie1.Language;
        this.plot       = movie1.Plot;
        this.actors     = movie1.Actors;
        console.log("** Title      "+this.title);
        console.log("** Year       "+this.year);
        console.log("** imdbRating "+this.imdbRating);
        console.log("** Rotten Tom "+this.rotten); 
        console.log("** Country    "+this.country);
        console.log("** Languuage  "+this.language);
        console.log("** Plot       "+this.plot);
        console.log("** Actors     "+this.actors);
        log.appendFile("./log.txt","\n"+this.title,      function(err) {if (err) {console.log(err); } });
        log.appendFile("./log.txt","\n"+this.year,       function(err) {if (err) {console.log(err); } });
        log.appendFile("./log.txt","\n"+this.imdbRating, function(err) {if (err) {console.log(err); } });
        log.appendFile("./log.txt","\n"+this.rotten,     function(err) {if (err) {console.log(err); } });
        log.appendFile("./log.txt","\n"+this.country,    function(err) {if (err) {console.log(err); } });
        log.appendFile("./log.txt","\n"+this.language,   function(err) {if (err) {console.log(err); } });
        log.appendFile("./log.txt","\n"+this.plot,       function(err) {if (err) {console.log(err); } });
        log.appendFile("./log.txt","\n"+this.actors,     function(err) {if (err) {console.log(err); } });        
      };
    });
  };
}    
    
module.exports = Movie;