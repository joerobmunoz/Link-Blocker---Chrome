'use strict';

var linkBlockerApp = angular.module('LinkBlockerApp', []);

linkBlockerApp.controller('backgroundCtrl', function($scope) {
	function onNavigation (details) {
		console.log(details.url);
	}

	chrome.webRequest.onBeforeRequest.addListener(
        function (details) { 
        	return {
        		cancel: true
        	}; 
        },
        {
        	urls: ["*://www.evil.com/*"]
        },
        ["blocking"]);
});

// Expose CRUD functions