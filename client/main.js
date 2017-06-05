(function ($) {

	'use strict';

	var WeatherFeed = function () {
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
		var geocoder = new google.maps.Geocoder();
		var address = "New York";
		geocoder.geocode( { 'address': address}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
		    console.log('this long and lat of sweden', results[0].geometry.location.lat(), results[0].geometry.location.lng())
		    
		    } 
		}); 
	}

	WeatherFeed.prototype.findUserLocation = function(searchInput) {
		convertLocation(searchInput);
	}

	function convertLocation (searchInput) {
		convertInput(searchInput);
	}
	function convertInput (searchInput){
		if(searchInput && typeof searchInput === 'string') {
			var geocoder = new google.maps.Geocoder();
			var address = searchInput;
			var searchCoords = {};
			geocoder.geocode( { 'address': address}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
				    console.log('this long and lat of sweden', results[0].geometry.location.lat(), results[0].geometry.location.lng())
				    searchCoords.searchLat = results[0].geometry.location.lat();
				    searchCoords.searchLong = results[0].geometry.location.lng();
				    $.post('/location/search', {searchType: 'coordinates', currentLatt: searchCoords.searchLat, currentLong: searchCoords.searchLong})
				    	.done(function(data) {
				    		console.log('this is the data we get back from the users search', data);
				    	})
				    
				} 
			}); 
		}

	}
	function searchCoordinates (coordObj) {
		console.log('this is the cords', coordObj)
		$.post('/location/search', {searchType: 'coordinates', currentLatt: coordObj.initialLatt, currentLong: coordObj.initialLong})
			.done(function(data) {
				console.log('this is data we get back from the /location/search', data);
			})
			$.post('/location/search', {searchType: 'text', text: 'London'})
				.done(function(data) {
					console.log('this is data we get back from the /location/search', data);
				})
	}

	function getInitialCoordinates() {
		let initialCoordinates = {};
		console.log('is there geolocation', navigator.geolocation);
	    if (navigator.geolocation) {
	       navigator.geolocation.getCurrentPosition(function(data) {
	       		console.log('this is the information we get back', data);
	       		initialCoordinates.initialLatt = data.coords.latitude;
	       		initialCoordinates.initialLong = data.coords.longitude;
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







