var linkBlockerApp = angular.module('LinkBlockerApp', []);

linkBlockerApp.controller("PopUpCtrl", function($scope) {
  console.log("PopUpCtrl loaded");

  // Stub data
  $scope.linkEntities = [
  	{
  		disabled: true,
  		link: "www.reddit.com"
  	},
  	{
  		disabled: false,
  		link: "www.angular.com"
  	}
  ];

  // Load any models in
  chrome.extension.getBackgroundPage().linkService.getAll();
});