var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	path = require('path'),
	cors = require('cors'),
	methodOverride = require('method-override'),
	http = require('http'),
	https = require('https'),
	request = require('request'),
	uri = 'https://www.metaweather.com/api/location/'
	PORT = process.env.PORT || 8081;


/** Middleware **/

app.use(express.static(path.resolve(__dirname, 'client')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride('X-HTTP-Method-Override'))
app.use(cors());

app.post('/location/search', (req, res) => {
	console.log('we are here', req.body);
	var url;
	var locationObj;
	if(req.body && req.body.searchType === 'text') {
		url = uri+'search/?query='+req.body.text;
	} else if(req.body && req.body.searchType === 'coordinates') {
		url = uri+'search/?lattlong='+req.body.currentLatt+','+req.body.currentLong;
	}
	console.log('what is the url search type', url)
	request.get({url: url, json: true}, function(err, data, body) {
		console.log('this is the body', data.body[0]);
		var locUrl = uri+data.body[0].woeid;
		request.get({url: locUrl, json:true}, function(err, weather, body) {
			console.log('we got the local weather', weather.body)
			res.json(weather.body)
		})
	})
	// .on('response', function(response) {
	// 	console.log('the on response', response);
	// });
});


app.listen(PORT, () => {
  console.log('Listening on port '.concat(PORT));
});

