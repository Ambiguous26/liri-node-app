// npm install request --save
var keys = require ("./keys.js");
var fs = require("fs");
var request = require("request");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");

var option = process.argv[2];
var value = process.argv[3];

var myTweets = function() {
	// keys.twitter takes you to my keys file and pulls info under the twitter property
	// new variable is created
	var client = new Twitter(keys.twitterKeys)
	// params is a varaible but param() creates a serialized representation of an array of objects
	// $.param(object,trad)
	var params = {count:20};
	
	// there is a client side and a server side
	// the below is the client side of things
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (error) {
			return console.log("Error occurred: " + error);
		}
		else {
			fs.appendFile("log.txt", "\nmy-tweets: \n", function(err) {
				if (err) {
					return console.log(err);
				}
			});
				for (var i = 0; i < tweets.length; i++) {
					console.log(tweets[i].text + "\nTweeted on: " + tweets[i].created_at);
					fs.appendFile("log.txt", tweets[i].text + "\n" + "Tweeted on: " + tweets[i].created_at + "\n", function(err) {
						if (err) {
							return console.log(err);
						}
					});
				}
				console.log("\nThese tweets were added to log.txt");
		}
	});

};//end of myTweets variable

var spotifyThisSong = function(value) {
	if(!value) {
		value = 'The Sign'
	}
	var songTitle = value;
	var spotify = new Spotify ({
		id: keys.spotifyKeys.clientID,
		secret: keys.spotifyKeys.clientSecret
	});
	// I know its type, query, and limit because of heveloper.spotify.com/web-api it shows you how the spotify searches using certain criterion
	spotify.search({type: 'track', query: songTitle, limit:1}, function(err, data) {
		if (err) {
			return console.log("Error occurred: " + err);
		}
		var result = data.tracks.items[0];
		var trackInfo = "Track Title: " + result.name +
										",Artist(s): " + result.album.artists[0].name +
										",Preview Link: " + result.external_urls.spotify +
										",Album Name: " + result.album.name;
		// the .split call separates every word with a "," It splits a string into an array of substrings.
		var dataArr = trackInfo.split (",");
		fs.appendFile("log.txt", "\nspotify-this-song: \n", function(err) {
				if (err) {
					return console.log(err);
				}
		});
		for (i = 0; i < dataArr.length; i++) {
			console.log(dataArr[i].trim());
			fs.appendFile("log.txt", dataArr[i].trim() + "\n", function(err) {
				if (err) {
					return console.log(err);
				}
			});
		}
		console.log("\nThis song was added to log.txt");
	
	});//end of spotify search

};//end of spotifyThisSong variable


// I don't think this code below is working properly.
var movieThis = function(value) {
	if (!value) {
		value = 'Mr. Nobody'
	}


	// Pulled from inclass example
	// Took the website and replaced what was searched with value
	// the last part includes the API key that was provided.
	request("https://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=40e9cece", function (error, response, body) {
		// this is a workaround, incase the error is undefined.
		// if the request is successful
		// need to understand this better
		if (!error && response.statusCode === 200) {
			// takes data received from a web server which is always a string and parses it in JS as an object
			// Parse the body of the site and recover just the imdbRating
			var result = "Title: " + JSON.parse(body).Title + 
						"\nYear: " + JSON.parse(body).Year +
		    			"\nIMDB Rating: " + JSON.parse(body).imdbRating +
		    			"\nRotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value +
		    			"\nCountry: " + JSON.parse(body).Country +
		    			"\nLanguage: " + JSON.parse(body).Language +
		    			"\nPlot Summary: " + JSON.parse(body).Plot +
						"\nActors: " + JSON.parse(body).Actors;
			console.log(result);

			fs.appendFile("log.txt", "\n\nmovie-this: \n" + result, function(err) {
				if (err) {
					return console.log(err);
				}
			});
			console.log("\nThis movie was added to log.text");

		}
		else {
			return console.log("Error occurred: " + error);
		};
	});

};//end of movieThis variable



// need to add the variable for what-to-do 


switch (option) {
	case "my-tweets":
		myTweets();
		break;

	case "spotify-this-song":
		spotifyThisSong(value);
		break;

	case "movie-this":
		movieThis(value);
		break;

// Just need to add the case and switch for do what it says.


	default:
		console.log("\nPlease enter one of the following:");
		console.log("my-tweets");
		console.log("spotify-this-song <Enter song title>");
		console.log("movie-this <Enter movie title>");

//Add the console.log for what to do
		
		break;
};


