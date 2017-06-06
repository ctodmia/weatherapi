(function ($) {
	'use strict';
	var WeatherFeed = function () {
		this.forecastObj = null;
		this.forecastArray = null;
		this.currentCity = null;
		this.updatedTime = null;
	}
	window.WeatherFeed = WeatherFeed;

	WeatherFeed.prototype.initialize = function (){
		this.getInitData();
	}

	WeatherFeed.prototype.getInitData = function (){
		convertLocation('Los Angeles,ca');
		getUserCoordinates();
	}

	WeatherFeed.prototype.findUserLocation = function(searchInput) {
		convertLocation(searchInput);
	}

	WeatherFeed.prototype.setForecast = function(forecast, dataSet) {
		this.currentCity = forecast.title;
		this.time = moment(forecast.time).format('h:mma');
		this.date = moment(forecast.time).format('MMMM Do YYYY');
		this.forecastArray = forecast.consolidated_weather;
		appendForecast(this);
		createGraph(dataSet);
		
	}

	WeatherFeed.prototype.averageTemp = function(forecast) {
		avgTemp = averageTemp(forecast);
	}

/** Utility Functions **/

	function appendForecast(weatherObj) {
		var forecastContainer = $('.forecast-container');
		forecastContainer.empty();
		$('.city').empty();
		$('.sub-info').empty();
		$('.city').append(weatherObj.currentCity);
		$('.sub-info').append(weatherObj.date+ ' ');
		$('.sub-info').append(weatherObj.time);
		$.each(weatherObj.forecastArray, function(i, val) {
			var forecastCard = $('<div>',{'class': 'col-sm-3'});
			if(i === 0) {
				var date = $('<span>', {'class': 'today'}).text('TODAY')
			} else {
				var date = $('<span>', {'class': 'date'}).text(moment(val.applicable_date).format('MMMM Do YYYY'));	
			}
			var txt1 = $('<img/>', {src:'https://www.metaweather.com/static/img/weather/png/64/'+ val.weather_state_abbr+'.png'});
			var state = $('<div>', {'class': 'weather-state'}).text(val.weather_state_name);
			var maxTemp = $('<div>').text('High: '+Math.round(convertTemperature(val.max_temp))+' F');
			var minTemp = $('<div>').text('Low: '+Math.round(convertTemperature(val.min_temp))+' F');
			forecastCard = forecastCard.append(date).append(txt1).append(state).append(maxTemp).append(minTemp);
			forecastCard = forecastCard.addClass('col-md-2');
			$('.forecast-container').append(forecastCard);
		})
	}

	function averageTemp (data) {
		$('.avg').empty();
		var tot = 0;
		data.forEach(function(d) {

			tot += d.temp;
		})
		var avg = (tot/12);
		$('.avg').append(Math.round(avg)+' F');
	}

	function convertTemperature (deg) {
		return deg * 9 / 5 + 32
	}
	function convertLocation(searchInput) {
		if(searchInput && typeof searchInput === 'string') {
			/** Google maps function to convert users city search to longitude and latitude location.  
				The results will be used to search the metaweather api.
			 **/
			var geocoder = new google.maps.Geocoder();
			var address = searchInput;
			var searchCoords = {};
			geocoder.geocode( { 'address': address}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
				    searchCoords.searchLatt = results[0].geometry.location.lat();
				    searchCoords.searchLong = results[0].geometry.location.lng();
				    searchCoordinates(searchCoords);
				    
				} 
			}); 
		}

	}
	function searchCoordinates(coordObj) {
			/** The service makes a call to my server which will request data from metaweather.com and return the obj.
			 **/
		$.post('/location/search', {searchType: 'coordinates', currentLatt: coordObj.searchLatt, currentLong: coordObj.searchLong})
			.done(function(data) {
				var dataSet = [];
				data.consolidated_weather.forEach(function(d) {
					d.letter = data.letter;
					d.frequency = +data.frequency;
					dataSet.push({day: d.applicable_date+' high' , temp: convertTemperature(d.max_temp) });
					dataSet.push({day: d.applicable_date+' low' , temp: convertTemperature(d.min_temp) });
				});
				averageTemp(dataSet)
				WeatherFeed.prototype.setForecast(data, dataSet);
			})
	}

	function getUserCoordinates() {
		var initialCoordinates = {};
	    if (navigator.geolocation) {
	       navigator.geolocation.getCurrentPosition(function(data) {
	       		console.log('this is the information we get back', data);
	       		initialCoordinates.searchLatt = data.coords.latitude;
	       		initialCoordinates.searchLong = data.coords.longitude;
	       		searchCoordinates(initialCoordinates);

	       })
	    } 
	}

	return {
		WeatherFeed: WeatherFeed
	}
}(jQuery));







