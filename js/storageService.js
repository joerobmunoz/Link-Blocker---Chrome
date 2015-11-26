"use strict";

(function () {
	function StorageService () {
		var incrementMaxId = function incrementMaxId (createItemCallback) {
			if (typeof createItemCallback === "undefined") throw "No callback specified";

			chrome.storage.local.get(null, function (items) {
				// Assign the next highest available integer as the ID
				var max = 0;
				for(var key in items) {
					if (items[key].id >= max) {
						max = items[key].id + 1;
					}
				}

				createItemCallback(max);
			});
		};

		return {
			create: function create (url, updateUIArrayCallback) {
				if (typeof updateUIArrayCallback === "undefined") throw "No callback specified";

				var createItem = function (id) {
					var obj = {};
					obj[id.toString()] = {
							id: id,
							disableTill: "",
							link: url,
							startingTime: +new Date()
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
			read: function read (id, callback) {
				if (id) {
					throw "Read(Id) method not yet implemented."
				} else {
					chrome.storage.local.get(null, function readCallback (items) {
						callback(items);
					});
				}
			},
			update: function update (e, updateFunction, callback) {
				if (typeof e.disableTill === "undefined" || e.disableTill <= Date()) {
					e.disableTill = new Date().timeRemaining();
				}

				e = updateFunction(e);	

				var obj = {};
				obj[e.id.toString()] = {
					id: e.id,
					disableTill: +new Date(e.disableTill), // Number casting
					link: e.link,
					startingTime: +new Date(e.startingTime)
				}

				chrome.storage.local.set(obj, callback);
			},
			delete: function deleteCall (id, deleteFromUICallback) {
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
