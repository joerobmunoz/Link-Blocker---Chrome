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
				var d = new Date();
				chrome.webRequest.onBeforeRequest.addListener(
					listenerCallback,
					{
						urls: items.map(function (obj) {
							if (typeof obj.disableTill !== "undefined" && new Date(obj.disableTill) > d) {
								console.log("Blocking: ".concat(obj.link));
								return "*://www.".concat(obj.link,"/*");
							}
						})
					},
					["blocking"]);
			}
		}
	}
})();


function BackgroundCtrl ($scope) { }

angular.module("LinkBlockerApp", []);

angular
	.module("LinkBlockerApp")
	.controller("BackgroundCtrl", BackgroundCtrl);