"use strict";

// Chrome Filtered Events Documentation:
// https://developer.chrome.com/extensions/events

var BackgroundService = (function () {
	function listenerCallback (details) {
		// Doesn't block twitter.com
		console.log(details.url);
		return {
	        	cancel: true
	    	};
    };

	return {
		evaluateAtTimeout: function evaluateAtTimeout (date, linkEntities) {
			if (typeof BackgroundService.timeout !== "undefined") {
				clearTimeout(BackgroundService.timeout);
			}

			BackgroundService.minTimeoutDate = date;

			BackgroundService.timeout = setTimeout(function backgroundTimeout () {
				BackgroundService.minTimeoutDate = undefined;
				BackgroundService.updateBlockList(linkEntities);
			}, Math.abs(new Date().getTime() - new Date(BackgroundService.minTimeoutDate).getTime()));

		},
		updateBlockList: function updateBlockList (items) {
			if (!Array.isArray(items)) {
				throw "Invalid value for argument 'items'. Expected array, received "
					.concat(Object.prototype.toString.call(items));
			}

			if (chrome.webRequest.onBeforeRequest.hasListeners()) {
				chrome.webRequest.onBeforeRequest.removeListener(listenerCallback);
			}

			var minDates = [];

			if (items.length > 0) {
				var d = new Date(),
					urlGroup = items.filter(function filterUndefinedDates (e) {
						if (typeof e.disableTill === "undefined") {
							throw "Object date is undefined.\nThis must always be a date or an empty string."
						}
						return e.disableTill !== "" && new Date(e.disableTill) > d
					}).map(function (e) {
						console.log("Blocking: ".concat(e.link));
						minDates.push(e.disableTill);
						return "*://www.".concat(e.link,"/*");
					});

				// Set timeout for first timer ending.
				if (minDates.length > 0) { // Must be date for array.min to work correctly
					var minDate = Math.min.apply(null, minDates);
					BackgroundService.evaluateAtTimeout(minDate, items);
				}

				if (urlGroup.length > 0) {
					chrome.webRequest.onBeforeRequest.addListener(
						listenerCallback,
						{
							urls: urlGroup
						},
						["blocking"]);
				}
			}
		}
	};
})();


function BackgroundCtrl ($scope) { }

angular.module("LinkBlockerApp", []);

angular
	.module("LinkBlockerApp")
	.controller("BackgroundCtrl", BackgroundCtrl);