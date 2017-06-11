/** Dependencies **/
var express = require('express'),
	app = express(),
	jade = require('jade'),
	bodyParser = require('body-parser'),
	path = require('path'),
	cors = require('cors'),
	request = require('request'),
	uri = 'https://www.metaweather.com/api/location/'
	PORT = process.env.PORT || 8081;

/** Middleware **/

// Deprecated. Please refer to line 21-23.
// app.use(express.static(path.resolve(__dirname, 'client')));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(cors());
var assetsPath = path.join(__dirname, 'assets');
app.set('views', assetsPath);
app.set('view engine', 'jade')


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

app.all('*', function(req, res) {
	res.render('index');
});

app.listen(PORT, () => {
  console.log('Listening on port '.concat(PORT));
});

