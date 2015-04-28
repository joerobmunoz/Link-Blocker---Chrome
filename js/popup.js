"use strict";

(function () {

	function PopUpCtrl ($scope, LinkService) {

		// Fetch initial data
		$scope.linkEntities = [];
		LinkService.read(null, function (items) {
			for(var key in items) {
			    $scope.linkEntities.push(items[key]);
			}
			$scope.$apply(); // Apply to force digest outside of cycle
		});

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
					$scope.$apply(); // Apply to force digest outside of cycle
				});
			}
		};

		// CRUD functions
		$scope.delete = function (idx, id) {
			LinkService.delete(id, function (idx) {
				$scope.linkEntities.splice(idx, 1);
				$scope.$apply(); // Apply to force digest outside of cycle
			});
		};
	};

	angular.module('LinkBlockerApp', []);

	angular
		.module("LinkBlockerApp")
		.controller("PopUpCtrl", PopUpCtrl);
})();