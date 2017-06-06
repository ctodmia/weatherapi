var weatherFeedInstance = new WeatherFeed();
	weatherFeedInstance.initialize();
var input = document.getElementById('search-input');
var searchBox = new google.maps.places.SearchBox(input);

$( "form" ).submit(function( event ) {
  event.preventDefault();
  var searchInput = $('input#search-input').val();
  weatherFeedInstance.findUserLocation(searchInput);
});


