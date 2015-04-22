"use strict";

(function () {

	function PopUpCtrl ($scope) {

		// Stub data
		$scope.linkEntities = [
		  	{
		  		id: 0,
		  		disabled: true,
		  		link: "www.reddit.com"
		  	},
		  	{
		  		id: 1,
		  		disabled: false,
		  		link: "www.angular.com"
		  	},
		  	{
		  		id: 2,
		  		disabled: false,
		  		link: "www.google.com"
		  	}
		];

		$scope.create = function (url) {
			// Stubbed Add till I make the service/resource.
			if (url) {
				$scope.linkEntities.push({
					id: 4,
					disabled: false,
					link: url
				})
			};
		};

		// CRUD functions
		$scope.delete = function (idx) {
			// Call delete method from service
			// chrome.extension.getBackgroundPage().linkService.delete(id);
			// var objectBeingDeleted = $scope.linkEntities[idx];

			// If successful, drop from view array. Splice is recommended.
			$scope.linkEntities.splice(idx, 1);
		};
	};

	angular.module('LinkBlockerApp', []);

	angular
		.module("LinkBlockerApp")
		.controller("PopUpCtrl", PopUpCtrl);
})();