"use strict";

(function () {
	function LinkService () {
		return {
			create: function (id, url, callback) {
				var obj = {};
				obj[id.toString()] = {
							id: id,
							disabled: true,
							link: url
						};

				chrome.storage.local.set(obj, function () {
						if (callback) {
							callback(obj[id.toString()]);
						}
					}
				);
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

