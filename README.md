Liri Search Bot

From the command line run the liri.js file as you would any other Node.js and provide it with any of the following commands then a search term as noted below:

Commands & Filter:

"concert-this" Artist
Will call the Bands In Town API and return the first result of a concert matching the artist that you entered.
"spotify-this-song" Song

Will call the Spotify API and return the first result matching the song you entered.
"movie-this" Movie

Will call the IMBD API and display the details of the movie you searched for.
"do-what-it-says" n/a

Dependancies:

fs
moment
axios
node-spotify-api
