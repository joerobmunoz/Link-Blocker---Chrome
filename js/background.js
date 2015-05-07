"use strict";

// Chrome Filtered Events Documentation:
// https://developer.chrome.com/extensions/events

var BackgroundService = (function () {
	function listenerCallback () {
		return {
	        	cancel: true
	    	}; 
    }

	return {
		updateBlockList: function (items) {
			if (!Array.isArray(items)) {
				throw "Invalid value for argument 'items'. Expected array, received "
					.concat(Object.prototype.toString.call(items));
			}

			if (chrome.webRequest.onBeforeRequest.hasListeners()) {
				chrome.webRequest.onBeforeRequest.removeListener(listenerCallback);
			}

			if (items.length > 0) {
				var d = new Date(),
					urlGroup = items.filter(function (e) {
						if (typeof e.disableTill === "undefined") {
							throw "Object date is undefined.\nThis must always be a date or an empty string."
						}
						return e.disableTill !== "" && new Date(e.disableTill) > d
					}).map(function (e) {
						console.log("Blocking: ".concat(e.link));
						return "*://www.".concat(e.link,"/*");
					});

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
	}
})();


function BackgroundCtrl ($scope) { }

angular.module("LinkBlockerApp", []);

angular
	.module("LinkBlockerApp")
	.controller("BackgroundCtrl", BackgroundCtrl);