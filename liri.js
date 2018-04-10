
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

var noSongQueryUrl = "https://api.spotify.com/v1/search?q=name:The+Sign&type:track&artist:Ace+of+Base"

var songQueryUrl = "https://api.spotify.com/v1/tracks/search?q=name:" + value1;

// var twitterUrl = "https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=kspex24&count=20"

// var songQueryUrl = "https://api.spotify.com/v1/search?q=name:"+value1+"&type=track";

// Write switch case to take in user input and respond accordingly:

switch (command) {

    case "my-tweets":
        //call to twitter for last 20 tweets and display in terminal

        var client = new Twitter({
            consumer_key: process.env.TWITTER_CONSUMER_KEY,
            consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
            access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
            access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
        });

        var params = { screen_name: 'kspex24' };
        client.get('statuses/user_timeline', params, function (error, tweet, response) {
            console.log("Tweets from kspex24");
        
            for (i = 0; i < 20; i++) {

            console.log("===============================================================================")
            console.log("Created: " + tweet[i].created_at)
            console.log("Tweet: " + tweet[i].text)
        }
            if (!error) {
            }
        });
        break;

    case "spotify-this-song":
        //call to spotify for song info

        if (value1 === undefined) {

            var spotify = new Spotify({
                id: process.env.SPOTIFY_ID,
                secret: process.env.SPOTIFY_SECRET
            });

            spotify.search({ type: 'track', query: "The Sign" }, function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }

            })
        }

        var spotify = new Spotify({
            id: process.env.SPOTIFY_ID,
            secret: process.env.SPOTIFY_SECRET
        });


        spotify.search({ type: 'track', query: value1 }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            console.log(JSON.stringify(data));
            console.log("Artist(s): " + JSON.stringify(data).tracks.artists);
            console.log("Song Name: " + JSON.stringify(data).tracks.track);
            // console.log("Preview Link: " + JSON.stringify(data).tracks.preview);
            console.log("Album: " + JSON.stringify(data).tracks.album);


        });

        break;

    case "movie-this":
        //call to OMDB for movie info

        if (value1 === undefined) {
            request(noMovieQueryUrl, function (error, response, body) {

                // If the request is successful (i.e. if the response status code is 200)
                if (!error && response.statusCode === 200) {

                }
                console.log("Title: " + JSON.parse(body).Title);
                console.log("Year: " + JSON.parse(body).Year);
                console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
                console.log("Country: " + JSON.parse(body).Country);
                console.log("Language: " + JSON.parse(body).Language);
                console.log("Plot: " + JSON.parse(body).Plot);
                console.log("Actors: " + JSON.parse(body).Actors);
                console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            })
        }
        else {

            request(movieQueryUrl, function (error, response, body) {
                // If the request is successful (i.e. if the response status code is 200)
                if (!error && response.statusCode === 200) {
                }
                // Parse the body of the site and recover just the imdbRating
                console.log("Title: " + JSON.parse(body).Title);
                console.log("Year: " + JSON.parse(body).Year);
                console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
                console.log("Country: " + JSON.parse(body).Country);
                console.log("Language: " + JSON.parse(body).Language);
                console.log("Plot: " + JSON.parse(body).Plot);
                console.log("Actors: " + JSON.parse(body).Actors);
                console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);

            });
        }

        break;


    case "do-what-it-says":

        // pull info from random.txt
        console.log("do what it says")



        fs.readFile("random.txt", "utf8", function (error, data) {

            // If the code experiences any errors it will log the error to the console.
            if (error) {
                return console.log(error);
            }
            console.log(random.txt)
            // We will then print the contents of data
            console.log(data);

            // Then split it by commas (to make it more readable)
            var dataArr = data.split(",");

            // We will then re-display the content as an array for later use.
            console.log(dataArr);

        });

        break;
    default:

}