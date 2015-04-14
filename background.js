'use strict';

var linkBlockerApp = angular.module('LinkBlockerApp', []);

linkBlockerApp.controller('backgroundCtrl', function($scope) {
});

// Expose CRUD functions

var linkService = (function () {

	return {
		getAll: function () {
			console.log('Get all entities.');
		},

		insert: function (e) {
			console.log('Insert: ' + e);
		},

		update: function (id) {
			console.log('Attempted update: ' + id.toString());
		}
	};
})();