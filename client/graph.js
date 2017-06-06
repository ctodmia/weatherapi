var data = [
  {letter: "A", frequency: .08167},
  {letter: "B", frequency: .01492},
  {letter: "C", frequency: .02780},
  {letter: "D", frequency: .04253},
  {letter: "E", frequency: .12702},
  {letter: "F", frequency: .02288},
  {letter: "G", frequency: .02022},
  {letter: "H", frequency: .06094},
  {letter: "I", frequency: .06973},
  {letter: "J", frequency: .00153},
  {letter: "K", frequency: .00747},
  {letter: "L", frequency: .04025},
  {letter: "M", frequency: .02517},
  {letter: "N", frequency: .06749},
  {letter: "O", frequency: .07507},
  {letter: "P", frequency: .01929},
  {letter: "Q", frequency: .00098},
  {letter: "R", frequency: .05987},
  {letter: "S", frequency: .06333},
  {letter: "T", frequency: .09056},
  {letter: "U", frequency: .02758},
  {letter: "V", frequency: .01037},
  {letter: "W", frequency: .02465},
  {letter: "X", frequency: .00150},
  {letter: "Y", frequency: .01971},
  {letter: "Z", frequency: .00074}
];

var margin = {top: 20, right: 10, bottom: 100, left: 40};
var	height = 500 - margin.top - margin.bottom;
var	width = 700 - margin.right - margin.left;
console.log('what is margin', width, height);


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
	.orient('left')

// xScale.domain(dataArray.map(function(data) {
function createGraph (data) {
	console.log('this is the data :', data);
	dataSet = [];
	data.forEach(function(d) {
		d.letter = data.letter;
		d.frequency = +data.frequency;
		dataSet.push({day: d.applicable_date+' high' , temp: convertTemperature(d.max_temp) });
		dataSet.push({day: d.applicable_date+' low' , temp: convertTemperature(d.min_temp) });
	})
	console.log('the data', dataSet)

	xScale.domain(dataSet.map(function(d) {return d.day;} ));
	yScale.domain([0, d3.max(dataSet, function(d) {return d.temp})]) ;
	svg.selectAll('rect')
		.data(dataSet)
		.enter()
		.append('rect')
		.attr({
			'x': function(d) {return xScale(d.day); }, 
			'y': function(d) {return yScale(d.temp); },
			'width': xScale.rangeBand(),
			'height': function(d) { return height - yScale(d.temp); }
		})
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

// }))




