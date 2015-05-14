"use strict";

(function () {
	function myTimerDirective () {
		return {
			restrict: 'EA',
			scope: { date: '=date'},
			link: function (scope, element, attrs) {
				var dataset = {
					percent: [85,15],
				};

				var width = 30,
				    height = 30,
				    radius = Math.min(width, height) / 2;

				var color = d3.scale.category20();

				var pie = d3.layout.pie()
				    .sort(null);

				var arc = d3.svg.arc()
				    .innerRadius(radius - 6)
				    .outerRadius(radius - 0);

				var svg = d3.select(element[0]).append("svg")
				    .attr("width", width)
				    .attr("height", height)
				    .append("g")
				    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

				var path = svg.selectAll("path")
				    .data(pie(dataset.percent))
					.enter().append("path")
				    .attr("fill", function(d, i) { return color(i); })
				    .attr("d", arc);
				}
		};
	}

	angular
		.module("LinkBlockerApp")
		.directive("myTimerDirective", myTimerDirective);
})();