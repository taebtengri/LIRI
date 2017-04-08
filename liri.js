var keys = require("./keys.js");
var request = require("request");
var twitter = require("twitter");
var spotify = require("spotify");
var fs = require("fs");

var client = new twitter({
  consumer_key: keys.twitterKeys.consumer_key,
  consumer_secret: keys.twitterKeys.consumer_secret,
  access_token_key: keys.twitterKeys.access_token_key,
  access_token_secret: keys.twitterKeys.access_token_secret
});

var action = process.argv[2];
var media = " ";

function main() {

if(action === "my-tweets") {


client.get('statuses/user_timeline', function(error, tweets, response) {
 for (i=0; i < 20; i++) {

  console.log(tweets[i].text); 
  console.log(tweets[i].created_at); 
  } 
});
log();
}

if(action === "spotify-this-song") {


if (media.length<2) {
	for(i=3; i < process.argv.length; i++){
		media +=  " " + process.argv[i];
	}
}

if (media.length<2) {
	media = "sign ace of base";
}


spotify.search({ type: 'track', query: media }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
 	
 	console.log("Artist: " + data.tracks.items[0].artists[0].name);
    console.log("Album: " + data.tracks.items[0].name);
    console.log("Song: " + media);
    console.log("Link: " + data.tracks.items[0].artists[0].external_urls.spotify);
    // console.log("Artist: " + data.items[0].name);
});
log();
}

if (action === "movie-this") {
	

if (media.length<2) {
	for(i=3; i < process.argv.length; i++){
		media +=  "+" + process.argv[i];
	}
}

if (media.length<2) {
	media = "mr+nobody";
}


request("http://www.omdbapi.com/?t=" + media + "&y=&plot=short&r=json", function(error, response, body) {
 if (!error && response.statusCode === 200) {   
    console.log("The movie's name is: " + JSON.parse(body).Title);
    console.log("The movie's year is: " + JSON.parse(body).Released);
    console.log("The movie's IMDB rating is: " + JSON.parse(body).imdbRating);
    console.log("The movie's country is: " + JSON.parse(body).Country);
    console.log("The movie's language is: " + JSON.parse(body).Language);
    console.log("The movie's plot is: " + JSON.parse(body).Plot);
    console.log("The movie's actors are: " + JSON.parse(body).Actors);
    console.log("The movie's Rotten Tomatoes rating is: " + JSON.parse(body).Ratings[1].Value);
    // console.log(body);



  }
});
log();
}

if (action === "do-what-it-says") {

fs.readFile("random.txt", "utf8", function(error, data) { 
  var dataArr = data.split(",");
  action = dataArr[0];
  media = dataArr[1];
  main();
  log();
});

}

}

main();

function log() {
	fs.appendFile("log.txt", process.argv[2] + " " + action + " " + media + "\n", function(err) {


  if (err) {
    return console.log(err);
  }

  
  console.log("log was updated!");

});
}

