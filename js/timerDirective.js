"use strict";

(function () {
	function updateDonut(element, date) {
		// var date = scope.date;

		var range = date.disableTill - date.startingTime;
		var elapsed = (new Date() - date.startingTime)/range;
		var dataset = {
			percent: [elapsed,1-elapsed], // elapsed/remaining
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

		// Destroy
		d3.select(element[0]).select("svg").remove();

		// Append
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

	function myTimerDirective ($interval) {
		return {
			restrict: "EA",
			scope: { date: "=date"},
			link: function ($scope, element, attrs) {
					updateDonut(element, $scope.date); // update DOM
					var timeoutId = $interval(function() {
			    		updateDonut(element, $scope.date); // update DOM
			    	}, 1000);

			    	element.on("$destroy", function() { // clean up
				    	$interval.cancel(timeoutId);
				    });
				}
			};
	}

	angular
		.module("LinkBlockerApp")
		.directive("myTimerDirective", ["$interval", myTimerDirective]);
})();