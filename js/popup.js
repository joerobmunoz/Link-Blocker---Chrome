"use strict";

(function () {
	function PopUpCtrl ($scope, $interval, EntityService, StorageService) {
		var createUIElement = function updateUIOnCreate (result) {
			$scope.$apply(function () { // Apply to force digest outside of cycle
				$scope.linkEntities.push(result);
				$scope.newLink = ""; // Clear input

				// Update block list
				chrome.extension.getBackgroundPage().BackgroundService.updateBlockList($scope.linkEntities);
			});
		},
		updateHourCallback = function (e) {
			e.disableTill = e.disableTill.addHours(1);
			return e;
		},
		updateMinutesCallback = function (e) {
			e.disableTill = e.disableTill.addMinutes(30);
			return e;
		}

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

		$scope.updateHour = function (e) {
			StorageService.update(e, updateHourCallback, function () {
				// Update block list
				$scope.$apply(function () {
					chrome.extension.getBackgroundPage().BackgroundService.updateBlockList($scope.linkEntities);
				});
			});
		};

		$scope.updateMinutes = function (e) {
			StorageService.update(e, updateMinutesCallback, function () {
				// Update block list
				$scope.$apply(function () {
					chrome.extension.getBackgroundPage().BackgroundService.updateBlockList($scope.linkEntities);
				});
			});
		};

		$scope.addTimeInterval = function (e) {
			return $interval(function() {
				if (e.disableTill !== "") {
					e.disableTill = e.disableTill.timeRemaining();
					console.log(e.disableTill.toTimeRemainingString());
				}
			}, 1000); // save intervals so that they can be deleted on UI delete
		};

		// Fetch initial data
		$scope.linkEntities = [];
		StorageService.read(null, function (items) {
			$scope.$apply(function () { // Apply to force digest outside of cycle

				// chrome.storage.local.clear(null);

				for (var key in items) {
					var ent = EntityService.generateEntity(items[key]);
					$scope.linkEntities.push(ent);
				    // $scope.addTimeInterval(ent);
				}

				// Update block list
				chrome.extension.getBackgroundPage().BackgroundService.updateBlockList($scope.linkEntities);
			});
		});
	};

	angular.module("LinkBlockerApp", []);

	angular
		.module("LinkBlockerApp")
		.controller("PopUpCtrl", PopUpCtrl);
})();