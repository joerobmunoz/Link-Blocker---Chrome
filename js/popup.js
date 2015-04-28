"use strict";

(function () {

	function PopUpCtrl ($scope, StorageService) {

		// Fetch initial data
		$scope.linkEntities = [];
		StorageService.read(null, function (items) {
			$scope.$apply(function () { // Apply to force digest outside of cycle
				for(var key in items) {
				    $scope.linkEntities.push(items[key]);
				}
			});
		});

		$scope.create = function (inputUrl) {
			function exists (element) {
				return element.link.toString() == inputUrl.toString();
			};

			// Filter for existing entries
			if (inputUrl && !$scope.linkEntities.some(exists)) {
				// Call storage service
				StorageService.create($scope.linkEntities.length, inputUrl, function (result) {
					$scope.$apply(function () { // Apply to force digest outside of cycle
						// Update UI array
						$scope.linkEntities.push(result);
					});
				});
			}
		};

		$scope.delete = function (idx, id) {
			StorageService.delete(id, function (idx) {
				$scope.$apply(function () {
					// Update UI array
					$scope.linkEntities.splice(idx, 1);
				});
			});
		};
	};

	angular.module('LinkBlockerApp', []);

	angular
		.module("LinkBlockerApp")
		.controller("PopUpCtrl", PopUpCtrl);
})();