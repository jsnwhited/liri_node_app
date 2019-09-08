require("dotenv").config();
var fs = require("fs");
var moment = require('moment');
var axios = require("axios");
const keys = require("./keys.js");
const Spotify = require('node-spotify-api');
let spotify = new Spotify(keys.spotify);


var spotifyTest = process.env.SPOTIFY_ID
let command = process.argv[2]
let searchTerm = process.argv[3]

fs.appendFile('log.txt', command + ",", function (err) {
    if (err) throw err;
});

switch (command){
    case "concert-this":  
        searchForBandsInTown(searchTerm);
        break;
    case "spotify-this-song":  
        spotifyThisSong(searchTerm);
        break;
    case "movie-this":  
        movieThis(searchTerm);
        break;
    case "do-what-it-says":  
        doRandom();
    break;
}
    
    function searchForBandsInTown(artist) {
        var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
        axios.get(queryUrl).then(
            function(response) {
                if(response.data[0].venue !=  undefined) {
                    console.log("Event Veunue: " + response.data[0].venue.name);
                    console.log("Event Location: " + response.data[0].venue.city);
                    var eventDateTime = moment(response.data[0].datetime);
                    console.log("Event Date & Time: " + eventDateTime.format("dddd, MMMM Do YYYY"));
                }
                else {
                    console.log("No results found.");
                }
            }
        ).catch(function (error) {
            console.log (error);
      });
    }

    function spotifyThisSong(song) {
        spotify
        .search({ type: 'track', query: song })
        .then(function(response){
            if (response.tracks.total === 0) {
                errorConditionForSpotify();
            } else {
                console.log("Artist: " + response.tracks.items[0].artists[0].name);
                console.log("Track: " + response.tracks.items[0].name);
                console.log("Preview URL: " + response.tracks.items[0].preview_url);
                console.log("Album: " + response.tracks.items[0].album.name);
            }
        }).catch(function (error) {  
            console.log(error);
            console.log("No Results found. Showing results for 'The Sign' by Ace of Base");
      });
    }

    function errorConditionForSpotify() {
        spotify
        .search({ type: 'track', query: 'The Sign' })
        .then(function(response) {
            for (var i=0;i < response.tracks.items.length; i++) {
                if (response.tracks.items[i].artists[0].name === "Ace of Base") {
                    console.log("Artist: " + response.tracks.items[i].artists[0].name);
                    console.log("Track: " + response.tracks.items[i].name);
                    console.log("Preview URL: " + response.tracks.items[i].preview_url);
                    console.log("Album: " + response.tracks.items[i].album.name);
                    i = response.tracks.items.length;
                }
            }
        }).catch(function (error) {  
            console.log(error);
            console.log("No Results found. ");
      });
    }

    function movieThis(movie) {
        axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&tomatoes=true&apikey=trilogy").then(
            function(response) {
                //console.log(response.data);
                if (response.data.Title != undefined) {
                    console.log("Title: " + response.data.Title);
                    console.log("Year: " + response.data.Year);
                    console.log("imdbRating:: " + response.data.imdbRating);
                    console.log("Title: " + response.data.Title);
                    console.log("Country:: " + response.data.Country);
                    console.log("Language:: " + response.data.Language);
                    console.log("Plot: " + response.data.Plot);
                    console.log("Actors: " + response.data.Actors);
                    console.log("RottenTomatoes: " + response.data.tomatoRating);
                } 
                else {
                    movieThis("Mr. Nobody");
                }
            }
            
        ).catch(function (error) {  
            console.log(error);
            console.log("No Results found. ");
      });
    }

  