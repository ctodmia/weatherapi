var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	path = require('path'),
	cors = require('cors'),
	methodOverride = require('method-override'),
	http = require('http'),
	https = require('https'),
	request = require('request')
	PORT = process.env.PORT || 8081;

/** Middleware **/

app.use(express.static(path.resolve(__dirname, 'client')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride('X-HTTP-Method-Override'))
app.use(cors());

app.get('/get', (req, res) => {
	console.log('we are here')
	res.send('hello');
  request.get('https://www.metaweather.com/api/location/44418/2013/4/27/', function(error, res, html) {
  	console.log('thisis the response', error,res);
  });
});


app.listen(PORT, () => {
  console.log('Listening on port '.concat(PORT));
});

