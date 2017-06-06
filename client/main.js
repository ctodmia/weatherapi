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

	WeatherFeed.prototype.setForecast = function(forecast) {
		this.currentCity = forecast.title;
		this.time = moment(forecast.time).format('h:mma');
		this.date = moment(forecast.time).format('MMMM Do YYYY');
		this.forecastArray = forecast.consolidated_weather;
		this.forecastObj = forecast;
		appendForecast(this);
		createGraph(this.forecastArray);
	}


	function appendForecast(weatherObj) {
		console.log('this is the weatherObj', weatherObj);
		$('h4.city').empty();
		$('p.sub-info').empty();
		$('h4.city').append(weatherObj.currentCity);
		$('p.sub-info').append(weatherObj.date);
		$('p.sub-info').append(weatherObj.time);

		var forecastContainer = $('.forecast-container');
		forecastContainer.empty();
		// console.log('this is the forecastArray', weatherObj.forecastArray);
		$.each(weatherObj.forecastArray, function(i, val) {
			var forecastCard = $('<div>',{'class': 'col-sm-2'});
			var date = $('<span>', {'class': 'date'}).text(moment(val.applicable_date).format('MMMM Do YYYY'));
			var txt1 = $('<img/>', {src:'https://www.metaweather.com/static/img/weather/png/64/'+ val.weather_state_abbr+'.png'});
			var state = $('<span>', {'class': 'weather-state'}).text(val.weather_state_name);
			var maxTemp = $('<span>').text('High: '+Math.round(convertTemperature(val.max_temp))+' F');
			var minTemp = $('<span>').text('Low: '+Math.round(convertTemperature(val.min_temp))+' F');

			forecastCard = forecastCard.append(date).append(txt1).append(state).append(maxTemp).append(minTemp);
			forecastCard = forecastCard.addClass('col-md-2');
			$('.forecast-container').append(forecastCard);
		})
	}
	
	function convertTemperature (deg) {
		return deg * 9 / 5 + 32
	}
	function convertLocation(searchInput) {
		if(searchInput && typeof searchInput === 'string') {
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
		$.post('/location/search', {searchType: 'coordinates', currentLatt: coordObj.searchLatt, currentLong: coordObj.searchLong})
			.done(function(data) {
				console.log('this is data we get back from the /location/search', data);
				WeatherFeed.prototype.setForecast(data);
			})
	}

	function getUserCoordinates() {
		let initialCoordinates = {};
		console.log('is there geolocation', navigator.geolocation);
	    if (navigator.geolocation) {
	       navigator.geolocation.getCurrentPosition(function(data) {
	       		console.log('this is the information we get back', data);
	       		initialCoordinates.searchLatt = data.coords.latitude;
	       		initialCoordinates.searchLong = data.coords.longitude;
	       		searchCoordinates(initialCoordinates);

	       })
	        // console.log('weve got the current location', currentLocation);
	    } else { 
	        x.innerHTML = "Geolocation is not supported by this browser.";
	    }
	}

	

	return {
		WeatherFeed: WeatherFeed
	}


}(jQuery));







