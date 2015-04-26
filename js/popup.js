"use strict";

(function () {

	function PopUpCtrl ($scope, LinkService) {

		// Stub data
		$scope.linkEntities = LinkService.read();

		$scope.create = function (inputUrl) {
			function exists (element) {
				return element.link.toString() == inputUrl.toString();
			};

			// Filter for existing entries
			if (inputUrl && !$scope.linkEntities.some(exists)) {
				// Call storage service
				LinkService.create($scope.linkEntities.length, inputUrl, function (result) {
					// Update UI array
					$scope.linkEntities.push(result);
				});
			}
		};

		// CRUD functions
		$scope.delete = function (idx, id) {
			// TODO: Call LinkService.delete
			// If successful, drop from view array. Splice is recommended.
			$scope.linkEntities.splice(idx, 1);
		};
	};

	angular.module('LinkBlockerApp', []);

	angular
		.module("LinkBlockerApp")
		.controller("PopUpCtrl", PopUpCtrl);
})();