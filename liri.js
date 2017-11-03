var keys = require ("./keys.js");
var fs = require("fs");
var request = require("request");
var Twitter = require("twitter");
// var Spotify = require("node-spotify-api");

var option = process.argv[2];
// var value = process.argv[3];

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

};

switch (option) {
	case "my-tweets":
		myTweets();
		break;

	default:
		console.log("\nPlease enter one of the following:");
		console.log("my-tweets");
		break;
};


// cmd.get(
// 	"pwd",
// 	function (err, data, stderr) {
// 		console.log("the current working dir is : ", data)
// 		// body...
// 	}
// );


// var fs = requre('fs');

// fx.readFile('index.html', (err, html) => {
// 	if (err){
// 		throw err;
// 	}



// var spotify = require ("random.txt");
// var hostname = "127.0.0.1";
// var port = 3000;

// var server = http.createServer ((req, res) => {
// 	res. statusCoe = 200;
// 	res.setHeader('Content-type', 'text/plain');
// 	res.write(html);
// 	res.end('Hello World!');
// });

// server.listen(port, hostname, () => {
// 	console.log('server started on port ' +port);
// });

// });

// var path = requre ("path");
// var bodyParser = requre("body-parser");

// var index = require ("index");

// var app = express();
