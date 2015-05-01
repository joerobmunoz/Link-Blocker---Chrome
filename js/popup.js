"use strict";

(function () {

	function PopUpCtrl ($scope, StorageService) {

		// Fetch initial data
		$scope.linkEntities = [];
		StorageService.read(null, function (items) {
			$scope.$apply(function () { // Apply to force digest outside of cycle

				// chrome.storage.local.clear(null);

				for(var key in items) {
				    $scope.linkEntities.push(items[key]);
				}

				// Update block list
				chrome.extension.getBackgroundPage().BackgroundService.updateBlockList($scope.linkEntities);
			});
		});

		var createUIElement = function (result) {
			$scope.$apply(function () { // Apply to force digest outside of cycle
				$scope.linkEntities.push(result);
				$scope.newLink = ""; // Clear input

				// Update block list
				chrome.extension.getBackgroundPage().BackgroundService.updateBlockList($scope.linkEntities);
			});
		};

		$scope.create = function (inputUrl) {
			var urlExists = function (element) {
				return element.link.toString() == inputUrl.toString();
			};

			// Filter for existing entries
			if (inputUrl && !$scope.linkEntities.some(urlExists)) {
				// Call storage service
				StorageService.create(inputUrl, createUIElement);
			} else {
				// If it already exists, help them find it.
				$scope.query = inputUrl;
			}
		};

		var deleteFromUI = function (id) {
			// Update UI array
			var updateUIArray = function () {
				$scope.linkEntities.forEach(function(item, idx) {
					if ($scope.linkEntities[idx].id == id) {
						$scope.linkEntities.splice(idx, 1);
					}
				});

				// Update block list
				chrome.extension.getBackgroundPage().BackgroundService.updateBlockList($scope.linkEntities);
			};

			$scope.$apply(updateUIArray); // Apply to force digest outside of cycle
		}

		$scope.delete = function (id) {
			StorageService.delete(id, deleteFromUI);
		};

		$scope.update = function (obj) {
			StorageService.update(obj, function () {
				// Update block list
				$scope.$apply(function () {
					chrome.extension.getBackgroundPage().BackgroundService.updateBlockList($scope.linkEntities);
				});
			});
		};
	};

	angular.module("LinkBlockerApp", []);

	angular
		.module("LinkBlockerApp")
		.controller("PopUpCtrl", PopUpCtrl);
})();