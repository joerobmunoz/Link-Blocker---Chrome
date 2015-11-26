"use strict";

(function () {
	function EntityService () {
		return {
				generateEntity :function (e) {
				if (typeof e === "undefined") throw "Entity parameter for generator is undefined.";

				return {
					id: e.id,
					// Chrome local storage will not fetch empty strings.
					disableTill: typeof e.disableTill === "undefined" || e.disableTill === "" ? "" : new Date(e.disableTill).timeRemaining(),
					link: e.link,
					startingTime: typeof e.startingTime === "undefined" || e.startingTime === "" ? "" : e.startingTime
				}
	 		}
	 	}
	}

	angular
		.module("LinkBlockerApp")
		.factory("EntityService", EntityService);
})();