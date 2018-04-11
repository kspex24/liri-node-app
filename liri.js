
require("dotenv").config();

var fs = require("fs");

var request = require("request");

var command = process.argv[2]

var value1 = process.argv[3]

var Twitter = require('twitter');

var Spotify = require('node-spotify-api');

var keys = require("./keys.js")

var noMovieQueryUrl = "http://www.omdbapi.com/?t=Mr.+Nobody&y=&plot=short&apikey=trilogy";

var movieQueryUrl = "http://www.omdbapi.com/?t=" + value1 + "&y=&plot=short&apikey=trilogy";

// var noSongQueryUrl = "https://api.spotify.com/v1/search?q=name:The+Sign&type:track&artist:Ace+of+Base"

// var songQueryUrl = "https://api.spotify.com/v1/tracks/search?q=name:" + value1;

//Print functions
function printMovieInfo() {

    console.log("Title: " + JSON.parse(body).Title);
    console.log("Year: " + JSON.parse(body).Year);
    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
    console.log("Country: " + JSON.parse(body).Country);
    console.log("Language: " + JSON.parse(body).Language);
    console.log("Plot: " + JSON.parse(body).Plot);
    console.log("Actors: " + JSON.parse(body).Actors);
    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
}

// Write switch case to take in user input and respond accordingly:

switch (command) {

    case "my-tweets":
        //call to twitter for last 20 tweets and display in terminal

        var client = new Twitter(keys.twitter);
        var params = { screen_name: 'kspex24' };
        client.get('statuses/user_timeline', params, function (error, tweet, response) {
            console.log("Tweets from kspex24");
            console.log("===============================================================================")

            for (i = 0; i < 20; i++) {
                console.log("Created: " + tweet[i].created_at)
                console.log("Tweet: " + tweet[i].text)
                console.log("===============================================================================")
            }
            if (error) {
                console.log("Error occurred.")
            }
        });
        break;

    case "spotify-this-song":
        //call to spotify for song info

        var spotify = new Spotify(keys.spotify);

        if (value1 === undefined) {
            spotify.search({ type: 'track', query: "The Sign" && "Ace of Base" }, function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }
                console.log("Song Info:");
                console.log("----------------------------------------------------------------------------");
                console.log("Album Name: " + (data).tracks.items[0].album.name);
                console.log("Song Name: " + (data).tracks.items[0].name);
                console.log("Preview Link: " + (data).tracks.items[0].preview_url);
                console.log("Artists: " + (data).tracks.items[0].artists[0].name);
                console.log("----------------------------------------------------------------------------");
            })
        }
        else {
            spotify.search({ type: 'track', query: value1 }, function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }
                console.log("Song Info:");
                console.log("----------------------------------------------------------------------------");
                console.log("Album Name: " + (data).tracks.items[0].album.name);
                console.log("Song Name: " + (data).tracks.items[0].name);
                console.log("Preview Link: " + (data).tracks.items[0].preview_url);
                console.log("Artists: " + (data).tracks.items[0].artists[0].name);
                console.log("----------------------------------------------------------------------------");
            })
        };

        break;

    case "movie-this":
        //call to OMDB for movie info
        //this request if for when a specific movie is NOT entered

        if (value1 === undefined) {
            request(noMovieQueryUrl, function (error, response, body) {

                // If the request is successful (i.e. if the response status code is 200)
                if (!error && response.statusCode === 200) {

                }
                console.log("Movie Info:");
                console.log("----------------------------------------------------------------------------");
                console.log("Title: " + JSON.parse(body).Title);
                console.log("Year: " + JSON.parse(body).Year);
                console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
                console.log("Country: " + JSON.parse(body).Country);
                console.log("Language: " + JSON.parse(body).Language);
                console.log("Plot: " + JSON.parse(body).Plot);
                console.log("Actors: " + JSON.parse(body).Actors);
                console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
                console.log("----------------------------------------------------------------------------");
            })
        }
        //this request if for when a specific movie IS entered
        else {

            request(movieQueryUrl, function (error, response, body) {
                // If the request is successful (i.e. if the response status code is 200)
                if (!error && response.statusCode === 200) {
                }
                // Parse the body of the site and recover just the imdbRating
                console.log("Movie Info:");
                console.log("----------------------------------------------------------------------------");
                console.log("Title: " + JSON.parse(body).Title);
                console.log("Year: " + JSON.parse(body).Year);
                console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
                console.log("Country: " + JSON.parse(body).Country);
                console.log("Language: " + JSON.parse(body).Language);
                console.log("Plot: " + JSON.parse(body).Plot);
                console.log("Actors: " + JSON.parse(body).Actors);
                console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
                console.log("----------------------------------------------------------------------------");

            });
        }
        break;

    case "do-what-it-says":

        // pull info from random.txt
        fs.readFile("random.txt", "utf8", function (error, data) {

            // If the code experiences any errors it will log the error to the console.
            if (error) {
                return console.log(error);
            }

            // Split the data in random.txt by commas (to make it more readable)
            var dataArr = data.split(",");

            command = dataArr[0]
            value1 = dataArr[1]

            var spotify = new Spotify(keys.spotify);

            spotify.search({ type: 'track', query: value1 }, function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }
                console.log("Song Info:");
                console.log("----------------------------------------------------------------------------")
                console.log("Album Name: " + (data).tracks.items[0].album.name);
                console.log("Song Name: " + (data).tracks.items[0].name);
                console.log("Preview Link: " + (data).tracks.items[0].preview_url);
                console.log("Artists: " + (data).tracks.items[0].artists[0].name);
                console.log("----------------------------------------------------------------------------");
            });

        });

        break;
    default:

}