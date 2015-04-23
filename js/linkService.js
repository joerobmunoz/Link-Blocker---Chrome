"use strict";

(function () {
	function LinkService () {
		var backgroundService = chrome.extension.getBackgroundPage().linkService;

		return {
			create: function (url) {
				console.log("Create called.");
			},
			read: function () {
				console.log("Read called.");
				return [
				  	{
				  		id: 0,
				  		disabled: true,
				  		link: "www.reddit.com"
				  	},
				  	{
				  		id: 1,
				  		disabled: false,
				  		link: "www.angular.com"
				  	},
				  	{
				  		id: 2,
				  		disabled: false,
				  		link: "www.google.com"
				  	}
				];
			},
			update: function () {
				console.log("Update called.");
			},
			delete: function () {
				console.log("Delete called.");
			}
		}
	}

	angular
		.module("LinkBlockerApp")
		.factory("LinkService", LinkService);
})();

