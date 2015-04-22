'use strict';

// Expose CRUD functions
var linkService = (function () {

	return {
		delete: function (id) {
			console.log('Remove entry: ' + id.toString());
		},

		getAll: function () {
			console.log('Get all entities.');
		},

		create: function (url) {
			console.log('Create: ' + url);
		},

		update: function (id) {
			console.log('Attempted update: ' + id.toString());
		}
	};
})();