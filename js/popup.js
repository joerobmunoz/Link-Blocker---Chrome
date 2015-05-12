"use strict";

(function () {
	function PopUpCtrl ($scope, $interval, EntityService, StorageService) {
		var addTimeInterval = function addTimeInterval (e) {
			$interval(function addTimeLoop () {
				$scope.linkEntities.forEach(function (e) {
					if (typeof e.disableTill === "undefined") throw "disableTill is undefined";

					if (e.disableTill !== "" && !e.disableTill.expired()) {
						e.disableTill.timeRemaining();
					}
				});
			}, 1000);
		},
		createUIElement = function updateUIOnCreate (result) {
			$scope.$apply(function updateUIOnCreateApply () { // Apply to force digest outside of cycle
				$scope.linkEntities.push(result);
				$scope.newLink = ""; // Clear input

				// Update block list
				chrome.extension.getBackgroundPage().BackgroundService.updateBlockList($scope.linkEntities);
			});
		},
		deleteFromUI = function deleteFromUI (id) {
			var updateUIArray = function updateUIArray () {
				$scope.linkEntities.forEach(function(item, idx) {
					if ($scope.linkEntities[idx].id == id) {
						$scope.linkEntities.splice(idx, 1);
					}
				});

				// Update block list
				chrome.extension.getBackgroundPage().BackgroundService.updateBlockList($scope.linkEntities);
			};

			$scope.$apply(updateUIArray); // Apply to force digest outside of cycle
		},
		updateHourCallback = function updateHourCallback (e) {
			e.disableTill = e.disableTill.addHours(1);
			return e;
		},
		updateMinutesCallback = function updateMinutesCallback (e) {
			e.disableTill = e.disableTill.addMinutes(30);
			return e;
		}

		$scope.create = function create (inputUrl) {
			var urlExists = function urlExists (element) {
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

		$scope.delete = function deleteCall (id) {
			StorageService.delete(id, deleteFromUI);
		};

		$scope.updateHour = function updateHour (e) {
			StorageService.update(e, updateHourCallback, function () {
				// Update block list
				$scope.$apply(function updateHourApply () {
					chrome.extension.getBackgroundPage().BackgroundService.updateBlockList($scope.linkEntities);
				});
			});
		};

		$scope.updateMinutes = function updateMinutes (e) {
			StorageService.update(e, updateMinutesCallback, function () {
				// Update block list
				$scope.$apply(function updateMinutesApply () {
					chrome.extension.getBackgroundPage().BackgroundService.updateBlockList($scope.linkEntities);
				});
			});
		};

		// Fetch initial data
		$scope.linkEntities = [];
		StorageService.read(null, function readCallback (items) {
			$scope.$apply(function addEntitiesToUI () { // Apply to force digest outside of cycle

				// chrome.storage.local.clear(null);

				for (var key in items) {
					var ent = EntityService.generateEntity(items[key]);
					$scope.linkEntities.push(ent)
				}

				addTimeInterval();

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