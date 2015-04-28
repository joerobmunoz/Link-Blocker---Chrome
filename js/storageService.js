"use strict";

(function () {
	function StorageService () {
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
			read: function (url, callback) {
				if (url) {
					console.log("url undefined")
					// Fetch via url
				} else {
					chrome.storage.local.get(null, function (items) {
						callback(items);
					});
				}
			},
			update: function () {
				console.log("Update called.");
			},
			delete: function (id, callback) {
				chrome.storage.local.remove(id.toString(), function () {
					callback();
				});
			}
		}
	}

	angular
		.module("LinkBlockerApp")
		.factory("StorageService", StorageService);
})();

