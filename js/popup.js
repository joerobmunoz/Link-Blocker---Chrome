"use strict";

(function () {

	Date.prototype.addHours = function (h) {
    	this.setHours(this.getHours()+h);
    	return this;
	}

	function PopUpCtrl ($scope, StorageService) {

		// Fetch initial data
		$scope.linkEntities = [];
		StorageService.read(null, function (items) {
			$scope.$apply(function () { // Apply to force digest outside of cycle

				// chrome.storage.local.clear(null);

				for(var key in items) {
					console.log(new Date(items[key].disableTill));
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

		$scope.update = function (e) {
			StorageService.update(e, function () {
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