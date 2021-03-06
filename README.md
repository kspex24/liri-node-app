# liri-node-app


Project Description:

Liri-node-app is a command line Node app that takes in user preferences to search twitter, spotify or OMDB.

How does it work? 
From the terminal prompt, the user types in node liri.js to execute the program.  They are prompted to select from the following choices: 
my-tweets
spotify-this-song
movie-this
do-what-it-says

If the user selects my-tweets, a request to twitter is made for a specified user screen name and the text and date created for the last 20 tweets are displayed on the screen and appended to a log.txt file.

If the user selects spotify-this-song, they are prompted to enter a song or hit enter for a random search.  A request to Spotify is made.  The random search displays a song/artist specified in the homework instructions (The Sign by Ace of Base)  Otherwise, the song entered by the user is requested.  Song title, album, artist(s), and a preview link are displayed for each request and the data is logged to the log.txt file.

If the user selects movie-this, they are prompted to enter a movie or hit enter for a random search.  A request to OMDB is made.  The random search displays a movie specified in the homework instructions (Mr. Nobody)  Otherwise, the song entered by the user is requested.  Movie title, year, country, language, IMDB Rating, Rotten Tomatoes Rating, Plot, and Actors are displayed for each request and the data is logged to the log.txt file.

If the user selects do-what-it-says.  A request to Spotify is made.  The search displays a song/artist specified in the homework instructions (I Want it That Way)  Otherwise, the song entered by the user is requested.  Song title, album, artist(s), and a preview link are displayed for each request and the data is logged to the log.txt file.

Who will use this repo or project?

This project is a homework assignment for Coding Bootcamp for full-stack developers at Georgia Tech. 

What is the goal of this project?

The goal of this project is to continue gaining experience with node and the different packages available.  Packages used in this app include fs, request, colors, inquirer, Twitter and Spotify.

Sample screens below:

<p>
    <img src="https://github.com/kspex24/liri-node-app/blob/master/images/lirinode1.png">
</p>

<p>
    <img src="https://github.com/kspex24/liri-node-app/blob/master/images/lirinode2.png">
</p>

<p>
    <img src="https://github.com/kspex24/liri-node-app/blob/master/images/lirinode3.png">
</p>

<p>
    <img src="https://github.com/kspex24/liri-node-app/blob/master/images/lirinode4.png">
</p>

<p>
    <img src="https://github.com/kspex24/liri-node-app/blob/master/images/lirinode5.png">
</p>


![alt inquirerchoiceprompt] (https://kspex24.github.io/liri-node-app/images/lirinode1.png)

![alt my-tweets] (https://kspex24.github.io/liri-node-app/images/lirinode2.png)

![alt spotify-this-song] (https://kspex24.github.io/liri-node-app/images/lirinode3.png)

![alt movie-this] (https://kspex24.github.io/liri-node-app/images/lirinode4.png)

![alt do-what-it-says] (https://kspex24.github.io/liri-node-app/images/lirinode5.png)



