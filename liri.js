
var Spotify = require("node-spotify-api");
require("dotenv").config();
var keys = require("./keys.js");
var moment = require("moment");
var fs = require("fs");
var axios = require("axios");

var spotify = new Spotify(keys.spotify)

var omdbapi = keys.OMDB.key

var searchCommand = process.argv[2];
var searchTerms = process.argv.slice(3).join("+");
 
var getMeSpotify = function(songname){
spotify.search({ type: 'track', query: songName }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data.track.items[0]); 
});
}

var pick = function (caseData, functionData){
switch(caseData){
    case 'spotify-this-song':
        getMeSpotify(functionData);
        break;
        default: console.log("LIRI does not know that");
    }
};