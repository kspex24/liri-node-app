
//Define variables and require packages, files
require("dotenv").config();

var fs = require("fs");

var request = require("request");

var colors = require('colors');

var inquirer = require('inquirer');

var Twitter = require('twitter');

var Spotify = require('node-spotify-api');

var keys = require("./keys.js")

// Prompt the user to choose a command.
inquirer.prompt([

    {
        type: "list",
        message: "Greetings! Please choose a command.",
        choices: ["my-tweets", "spotify-this-song", "movie-this", "do-what-it-says"],
        name: "choice"
    }

    // After the prompt, store the user's response in a variable called location.
]).then(function (Response) {
    var command = Response.choice

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
                    console.log("Created: " + tweet[i].created_at + "\nTweet: " + tweet[i].text)
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

            //Inquirer prompt to see if user has specific song to search:

            inquirer.prompt([
                {
                    type: "input",
                    message: "Enter a specific song or just press Enter for a random song search",
                    name: "song"
                }

                // After the prompt, store the user's response in a variable called location.
            ]).then(function (Response) {
                var value1 = Response.song

                //call to spotify for song info, execute function to display in terminal and append search data to log.txt

                //request when song NOT specified, assign value

                if (value1 === "") {
                    value1 = "The Sign" && "Ace of Base"

                    songFinder(value1);
                }

                else {
                    songFinder(value1);
                };
            })
            break;

        case "movie-this":

            //Inquirer prompt to see if user has specific movie to search:

            inquirer.prompt([
                {
                    type: "input",
                    message: "Enter a specific movie or just press Enter for a random movie search",
                    name: "movie"
                }

                // After the prompt, store the user's response in a variable called value1.
            ]).then(function (Response) {
                var value1 = Response.movie


                //set value1 for call OMDB for movie info; this request for when a specific movie is NOT entered.
                if (value1 === "") {
                    value1 = "Mr. Nobody"
                    searchMovie(value1);
                }
                //this request for when a specific movie IS entered.
                else {

                    searchMovie(value1);
                }
            });
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
                value1 = dataArr[1]

                songFinder(value1);
            });

            break;
        default:
    }
});

//Function to search movie database and execute printMovieInfo function
function searchMovie(value1) {
    request("http://www.omdbapi.com/?t=" + value1 + "&y=&plot=short&apikey=trilogy", function (error, response, body) {
        // request("http://www.omdbapi.com/?t=Mr.+Nobody&y=&plot=short&apikey=trilogy", function (error, response, body) {

        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {
        }
        printMovieInfo(body);
    })
}

//Function to search song database and execute printSongInfo function
function songFinder(value1) {
    var spotify = new Spotify(keys.spotify);

    spotify.search({ type: 'track', query: value1 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        printSongInfo(data);
    })
}

//Print and log functions. Display in terminal and append search data to log.txt
function printMovieInfo(body) {

    console.log("Movie Info:".magenta.bold);
    console.log("----------------------------------------------------------------------------".magenta.bold);
    console.log("Title: " + JSON.parse(body).Title + "\nYear: " + JSON.parse(body).Year + "\nIMDB Rating: " + JSON.parse(body).imdbRating + "\nCountry: "
        + JSON.parse(body).Country + "\Language: " + JSON.parse(body).Language + "\nPlot: " + JSON.parse(body).Plot + "\nActors: " 
        + JSON.parse(body).Actors + "\nRotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
    console.log("----------------------------------------------------------------------------".magenta.bold);

    var logTxt =
        "\n====New Entry======" + "\nTitle: " + JSON.parse(body).Title + " Year: " + JSON.parse(body).Year + " IMDB Rating: " + JSON.parse(body).imdbRating 
        + " Country: " + JSON.parse(body).Country + " Language: " + JSON.parse(body).Language + "\nPlot: " + JSON.parse(body).Plot + "\nActors: "
         + JSON.parse(body).Actors + " Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value + "\n====End======"

    fs.appendFile("log.txt", logTxt, function (err) {
        if (err) throw err;
    });
}

function printSongInfo(data) {
    console.log("Song Info:".green.bold);
    console.log("----------------------------------------------------------------------------".green.bold)
    console.log("Album Name: " + (data).tracks.items[0].album.name + "\nSong Name: " + (data).tracks.items[0].name + "\nPreview Link: " + (data).tracks.items[0].preview_url
        + "\nArtists: " + (data).tracks.items[0].artists[0].name);
    console.log("----------------------------------------------------------------------------".green.bold);

    var logTxt =
        "\n====New Entry======" + "Album Name: " + (data).tracks.items[0].album.name + " Song Name: " + (data).tracks.items[0].name + " Artists: " 
        + (data).tracks.items[0].artists[0].name
        + "\nPreview Link: " + (data).tracks.items[0].preview_url + "\n====End======"

    fs.appendFile("log.txt", logTxt, function (err) {
        if (err) throw err;
    });
}

