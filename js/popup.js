"use strict";

(function () {

	function PopUpCtrl ($scope, LinkService) {

		// Stub data
		$scope.linkEntities = LinkService.read();

		$scope.create = function (url) {
			// Stubbed Add till I make the service/resource.

			// LinkService.create
			if (url) {
				$scope.linkEntities.push({
					id: 4,
					disabled: false,
					link: url
				})
			};
		};

		// CRUD functions
		$scope.delete = function (idx, id) {
			// Call LinkService.delete
			// If successful, drop from view array. Splice is recommended.
			$scope.linkEntities.splice(idx, 1);
		};
	};

	angular.module('LinkBlockerApp', []);

	angular
		.module("LinkBlockerApp")
		.controller("PopUpCtrl", PopUpCtrl);
})();