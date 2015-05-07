(function () {
	Date.prototype.addHours = function (h) {
    	this.setHours(this.getHours() + h);
    	return this;
	}
	Date.prototype.addMinutes = function (m) {
    	this.setMinutes(this.getMinutes() + m);
    	return this;
	}
	Date.prototype.timeRemaining = function () {
		var d = new Date();
		this.hoursRemaining = 0;
		this.minutesRemaining = 0;
		this.secondsRemaining = 0;
		if (this > d) {
			var seconds = Math.floor(Math.abs(this.getTime() - d.getTime())/1000)

			this.minutesRemaining = Math.floor(seconds/60) % 60
			this.hoursRemaining = Math.floor(seconds/3600);
			this.secondsRemaining = seconds % 60;
		}
	}
	Date.prototype.toTimeRemainingString = function () {
		this.timeRemaining();
		if (this.hoursRemaining !== 0 || this.minutesRemaining !== 0 || this.secondsRemaining !== 0) {
			var timeString = "";
			if (this.hoursRemaining > 0) {
				timeString = timeString.concat(this.hoursRemaining, " hours, ");
			}
		
			return timeString.concat(this.minutesRemaining, " min, ", this.secondsRemaining, " sec")
		} else {
			return "";
		}
	}
	
	angular.module('LinkBlockerApp').filter('dateText', function() {
    	return function(date) {
    		return date === "" ? "" : date.toTimeRemainingString();
    	};
    });
})();