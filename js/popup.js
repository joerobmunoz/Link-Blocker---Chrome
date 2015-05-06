"use strict";

(function () {

	Date.prototype.addHours = function (h) {
    	this.setHours(this.getHours() + h);
    	return this;
	}
	Date.prototype.addMinutes = function (m) {
    	this.setMinutes(this.getMinutes() + m);
    	return this;
	}
	Date.prototype.toTimeRemainingString = function () {
		var d = new Date();
		this.hoursRemaining = 0;
		this.secondsRemaining = 0;
		if (this < d) {
			return ""; // Invalid comparison
		} else {
			var seconds = Math.floor(Math.abs(this.getTime() - d.getTime())/1000),
				timeString = "";

			this.minutesRemaining = Math.floor(seconds/60) % 60
			this.hoursRemaining = Math.floor(seconds/3600);
			this.secondsRemaining = seconds % 60;
			if (this.hoursRemaining > 0) {
				timeString = timeString.concat(this.hoursRemaining, " hours, ");
			}
			
			return timeString.concat(this.minutesRemaining, " min, ", this.secondsRemaining, " sec")
		}
	}

	function PopUpCtrl ($scope, StorageService) {
		var addTimeInterval = function (e) {
			return $interval(function(e) {

			}, 1000); // save intervals so that they can be deleted on UI delete
		},
		createUIElement = function (result) {
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

		var updateHourCallback = function (e) {
				e.disableTill = e.disableTill.addHours(1);
				return e;
			},
			updateMinutesCallback = function (e) {
				e.disableTill = e.disableTill.addMinutes(30);
				return e;
			}


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

		// Fetch initial data
		$scope.linkEntities = [];
		StorageService.read(null, function (items) {
			$scope.$apply(function () { // Apply to force digest outside of cycle

				// chrome.storage.local.clear(null);

				for(var key in items) {
				    $scope.linkEntities.push({
				    	id: items[key].id,
						disableTill: items[key].disableTill !== "" ? new Date(items[key].disableTill) : "",
						link: items[key].link
				    });
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