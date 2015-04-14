var linkBlockerApp = angular.module('LinkBlockerApp', []);

linkBlockerApp.controller("PopUpCtrl", function($scope) {
  console.log("PopUpCtrl loaded");
  $scope.foos = "Test";
});