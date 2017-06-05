'use strict';

let weatherFeedInstance = new WeatherFeed();
weatherFeedInstance.initialize();

let input = document.getElementById('search-input');
let searchBox = new google.maps.places.SearchBox(input);

$( "form" ).submit(function( event ) {
  event.preventDefault();
  
  let searchInput = $('input#search-input').val();
  weatherFeedInstance.findUserLocation(searchInput);
  console.log('you got the form', searchInput);
});

console.log('this is the search box', searchBox);