
require("dotenv").config();

var fs = require("fs");

var request = require("request");

var colors = require('colors');

var inquirer = require('inquirer');

var command = process.argv[2]

var value1 = process.argv[3]

var Twitter = require('twitter');

var Spotify = require('node-spotify-api');

var keys = require("./keys.js")

var noMovieQueryUrl = "http://www.omdbapi.com/?t=Mr.+Nobody&y=&plot=short&apikey=trilogy";

var movieQueryUrl = "http://www.omdbapi.com/?t=" + value1 + "&y=&plot=short&apikey=trilogy";

// inquirer
//   .prompt([
//     // List of commands to choose from
//     {
//       type: "list",
//       message: "Greetings! Please choose a command.",
//       choices: ["my-tweets", "spotify-this-song", "movie-this", "do-what-it-says"],
//       name: "commandChoice"
//     }]
//     .then(function(inquirerResponse) {
//          var command = inquirerResponse.commandChoice;

//       })

//     inquirer
//   .prompt([
//     // Here we create a basic text prompt.
//     {
//       type: "input",
//       message: "Please enter a search choice:",
//       name: "value1"
//     }
// ])
//     .then(function(inquirerResponse) {
//     
//     });

// Write switch case to take in user input and respond accordingly:

switch (command) {

    case "my-tweets":
        //call to twitter for last 20 tweets, display in terminal and append search data to log.txt

        var client = new Twitter(keys.twitter);
        var params = { screen_name: 'kspex24' };
        client.get('statuses/user_timeline', params, function (error, tweet, response) {
            console.log("Tweets from kspex24".cyan.bold);
            console.log("===============================================================================".cyan.bold)

            for (i = 0; i < 20; i++) {
                console.log("Created: " + tweet[i].created_at)
                console.log("Tweet: " + tweet[i].text)
                console.log("===============================================================================".cyan.bold)

                var logTxt =
                    "\nDate: " + tweet[i].created_at + " Tweet: " + tweet[i].text

                fs.appendFile("log.txt", logTxt, function (err) {
                    if (err) throw err;
                });
            }
            var logTxt =
                "\n========end========"

            fs.appendFile("log.txt", logTxt, function (err) {
                if (err) throw err;
            });
            if (error) {
                console.log("Error occurred.")
            }
        });

        break;

    case "spotify-this-song":
        //call to spotify for song info, display in terminal and append search data to log.txt

        var spotify = new Spotify(keys.spotify);

        //request when song NOT specified

        if (value1 === undefined) {
            spotify.search({ type: 'track', query: "The Sign" && "Ace of Base" }, function (err, data) {

                if (err) {
                    return console.log('Error occurred: ' + err);
                }
                printSongInfo(data);

            })
        }

        //request when song IS specified, display in terminal and append search data to log.txt

        else {

            spotify.search({ type: 'track', query: value1 }, function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);

                }
                printSongInfo(data);
            })
        };

        break;

    case "movie-this":
        //call to OMDB for movie info
        //this request for when a specific movie is NOT entered, display in terminal and append search data to log.txt

        if (value1 === undefined) {
            request(noMovieQueryUrl, function (error, response, body) {

                // If the request is successful (i.e. if the response status code is 200)
                if (!error && response.statusCode === 200) {
                }
                printMovieInfo(body);
            })
        }
        //this request for when a specific movie IS entered, display in terminal and append search data to log.txt
        else {

            request(movieQueryUrl, function (error, response, body) {
                // If the request is successful (i.e. if the response status code is 200)

                if (!error && response.statusCode === 200) {
                }
                printMovieInfo(body);
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
                printSongInfo(data);
            });
        });

        break;
    default:
}

//Print and log functions
function printMovieInfo(body) {

    console.log("Movie Info:".magenta.bold);
    console.log("----------------------------------------------------------------------------".magenta.bold);
    console.log("Title: " + JSON.parse(body).Title);
    console.log("Year: " + JSON.parse(body).Year);
    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
    console.log("Country: " + JSON.parse(body).Country);
    console.log("Language: " + JSON.parse(body).Language);
    console.log("Plot: " + JSON.parse(body).Plot);
    console.log("Actors: " + JSON.parse(body).Actors);
    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
    console.log("----------------------------------------------------------------------------".magenta.bold);

        var logTxt =
                "\n====New Entry======" + "\nTitle: " + JSON.parse(body).Title + " Year: " + JSON.parse(body).Year + " IMDB Rating: " + JSON.parse(body).imdbRating + " Country: " + JSON.parse(body).Country +
                " Language: " + JSON.parse(body).Language + "\nPlot: " + JSON.parse(body).Plot + "\nActors: " + JSON.parse(body).Actors + " Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value + "\n====End======"

        fs.appendFile("log.txt", logTxt, function (err) {
                if (err) throw err;
        });
}

function printSongInfo(data) {
    console.log("Song Info:".green.bold);
    console.log("----------------------------------------------------------------------------".green.bold)
    console.log("Album Name: " + (data).tracks.items[0].album.name);
    console.log("Song Name: " + (data).tracks.items[0].name);
    console.log("Preview Link: " + (data).tracks.items[0].preview_url);
    console.log("Artists: " + (data).tracks.items[0].artists[0].name);
    console.log("----------------------------------------------------------------------------".green.bold);
            
        var logTxt =
                "\n====New Entry======" + "Album Name: " + (data).tracks.items[0].album.name + " Song Name: " + (data).tracks.items[0].name + " Artists: " + (data).tracks.items[0].artists[0].name
                + "\nPreview Link: " + (data).tracks.items[0].preview_url + "\n====End======"

        fs.appendFile("log.txt", logTxt, function (err) {
                if (err) throw err;
        });
}
