var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	path = require('path'),
	cors = require('cors'),
	request = require('request'),
	uri = 'https://www.metaweather.com/api/location/'
	PORT = process.env.PORT || 8081;

/** Middleware **/
app.use(express.static(path.resolve(__dirname, 'client')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(cors());

//revision required. This should be a get request (on frontend as well)
//will fix in next version build
app.post('/location/search', (req, res) => {
	var url;
	var locationObj;
	if(req.body && req.body.searchType === 'text') {
		url = uri+'search/?query='+req.body.text;
	} else if(req.body && req.body.searchType === 'coordinates') {
		url = uri+'search/?lattlong='+req.body.currentLatt+','+req.body.currentLong;
	}
	/*request is the service help access the metaweather api and get past security issues*/
	request.get({url: url, json: true}, function(err, data, body) {
		var locUrl = uri+data.body[0].woeid;
		request.get({url: locUrl, json:true}, function(err, weather, body) {
			res.json(weather.body)
		})
	})
});

app.listen(PORT, () => {
  console.log('Listening on port '.concat(PORT));
});

