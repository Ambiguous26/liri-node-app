// npm install request --save
var keys = require ("./keys.js");
var fs = require("fs");
var request = require("request");
var Twitter = require("twitter");
// var Spotify = require("node-spotify-api");

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
										",Preview Link: " + result.external_uris.spotify +
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



switch (option) {
	case "my-tweets":
		myTweets();
		break;

	case "spotify-this-song":
		spotifyThisSong(value);
		break;

	default:
		console.log("\nPlease enter one of the following:");
		console.log("my-tweets");
		console.log("spotify-this-song <Enter song title>");
		break;
};


