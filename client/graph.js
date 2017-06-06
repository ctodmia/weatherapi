function createGraph (dataSet) {
	/** The following is d3 logic used for creating the frontend graph.**/
	d3.select('svg').remove();
	var margin = {top: 20, right: 10, bottom: 100, left: 40};
	var	height = 500 - margin.top - margin.bottom;
	var	width = 700 - margin.right - margin.left;
	var svg = d3.select("section")
		.append("svg:svg")
		.attr("width", width + margin.right + margin.left) 
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
			.attr('transform', 'translate(' + margin.left + ',' + margin.right + ')');

	var xScale = d3.scale.ordinal()
		.rangeRoundBands([0, width], 0.2, 0.2);

	var yScale = d3.scale.linear()
		.range([height, 0]);

	var xAxis = d3.svg.axis()
		.scale(xScale)
		.orient('bottom');

	var yAxis = d3.svg.axis()
		.scale(yScale)
		.orient('left');

	xScale.domain(dataSet.map(function(d) {return d.day;} ));
	yScale.domain([0, 100]);
	svg.selectAll('rect')
		.data(dataSet)
		.enter()
		.append('rect')
		.attr({
			'x': function(d) {return xScale(d.day); }, 
			'y': function(d) {return yScale(d.temp); },
			'width': xScale.rangeBand(),
			'height': function(d) { return height - yScale(d.temp); },
			fill: 'blue'
		})
		.style('color', 'blue')
	svg.append('g')
		.attr('class', 'x axis')
		.attr('transform', 'translate(0,' +height+')')
		.call(xAxis)
		.selectAll('text')
		.attr("transform", "rotate(-60)")
		.attr("dy", "1.25em")
		.style('text-anchor', 'end');
	svg.append('g')
		.attr('class', 'y axis')
		.call(yAxis);

}
function convertTemperature (deg) {
	return deg * 9 / 5 + 32
}
function convertDay(day) {
	moment(day).format('MMMM Do YYYY');
}





