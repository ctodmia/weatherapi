(function ($) {

	'use strict';

	let WeatherFeed = function () {
		this.arrayOfFeed = null;
	}

	window.WeatherFeed = WeatherFeed;

	WeatherFeed.prototype.initialize = function (){
		this.getAllData();
	}
	//API RECIPES
		//Url format for specific coordinates
			//'https://www.metaweather.com/api/location/search/?lattlong=37.8138885,-122.27661680000001'
		//Url format for specific woeid
			//https://www.metaweather.com/api/location/2463583 find this using location search 
	WeatherFeed.prototype.getAllData = function (){
		let staticUrl = 'https://www.metaweather.com/api/location/search/?query=london';
		// testUrl = 'https://www.metaweather.com/api/location/search/?lattlong=37.8138885,-122.27661680000001'
		// https://www.metaweather.com/api/location/2463583/2017/6/7/

		getInitialCoordinates()
		// $.ajax({
		// 	url: '/get',
		// 	method: 'GET',
		// }).done(function(response) {
		// 	console.log('this is the respons', response);
		// 	getLocation();
		// })
		// $.get(staticUrl).done(function (response) {
		// 	console.log('this is the response', response);
		// }).fail(function(error) {
		// 	console.log('this is the error', error);
		// });
	}

	function getInitialLocation() {
		let getInitialCoordinates = {};
		console.log('is there geolocation', navigator.geolocation);
	    if (navigator.geolocation) {
	       let coords = navigator.geolocation.getCurrentPosition(function(data) {
	       		console.log('this is the information we get back', data);
	       		getInitialCoordinates.initialLatt = data.coords.latitude;
	       		getInitialCoordinates.initialLong = data.coords.longitude;
	       		console.log('this is coordss', coords);
	       		return initialLocation;

	       })
	        // console.log('weve got the current location', currentLocation);
	    } else { 
	        x.innerHTML = "Geolocation is not supported by this browser.";
	    }
	}

}(jQuery));