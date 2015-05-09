(function () {
	Date.prototype.addHours = function (h) {
    	this.setHours(this.getHours() + h);
    	return this;
	}
	Date.prototype.addMinutes = function (m) {
    	this.setMinutes(this.getMinutes() + m);
    	return this;
	}
	Date.prototype.expired = function () {
		if (typeof this.hoursRemaining === "undefined" || typeof this.minutesRemaining === "undefined" || typeof this.secondsRemaining === "undefined") {
			throw "Remaining time properties are undefined. Call 'timeRemaining' on date before evaluating it's expiration."
		}

		if (this.hoursRemaining === 0 && this.minutesRemaining === 0 && this.secondsRemaining === 0) {
			return true;
		} else {
			return false;
		}
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

		return this;
	}
	Date.prototype.toTimeRemainingString = function () {
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
    		return date === "" ? "" : (function () {
    			date.timeRemaining();
    			return date.toTimeRemainingString();
    		})();
    	};
    });
})();