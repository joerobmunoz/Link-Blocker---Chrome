"use strict";

(function () {

	function PopUpCtrl ($scope, LinkService) {

		// Stub data
		$scope.linkEntities = LinkService.read();

		$scope.create = function (inputUrl) {
			$scope.exists = function (element) {
				return element.link.toString() == inputUrl.toString()
			};

			// Filter for existing entries
			if (inputUrl && !$scope.linkEntities.some($scope.exists)) {
				// TODO: Call to CRUD Service
				
				// Update UI
				$scope.linkEntities.push({
					id: 4,
					disabled: false,
					link: inputUrl
				});
			}
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