"use strict";

(function () {
	function StorageService () {
		var incrementMaxId = function (createItemCallback) {
			if (typeof createItemCallback === "undefined") throw "No callback specified";

			chrome.storage.local.get(null, function (items) {
				// Assign the next highest available integer as the ID
				var max = 0;
				for(var key in items) {
					console.log(items[key].id.toString());
					if (items[key].id >= max) {
						max = items[key].id + 1;
					}
				}

				createItemCallback(max);
			});
		};

		return {
			create: function (url, updateUIArrayCallback) {
				if (typeof updateUIArrayCallback === "undefined") throw "No callback specified";

				var createItem = function (id) {
					var obj = {};
					obj[id.toString()] = {
							id: id,
							disabled: true,
							link: url
						};

					// Create new object with ID
					chrome.storage.local.set(obj, function () {
							if (updateUIArrayCallback) {
								updateUIArrayCallback(obj[id.toString()]);
							}
						}
					);
				};

				incrementMaxId(createItem);
			},
			read: function (id, callback) {
				if (id) {
					throw "Read(Id) method not yet implemented."
				} else {
					chrome.storage.local.get(null, function (items) {
						callback(items);
					});
				}
			},
			update: function () {
				throw "Update has not yet been implemented."
			},
			delete: function (id, deleteFromUICallback) {
				chrome.storage.local.remove(id.toString(), function () {
					deleteFromUICallback(id);
				});
			}
		}
	}

	angular
		.module("LinkBlockerApp")
		.factory("StorageService", StorageService);
})();

