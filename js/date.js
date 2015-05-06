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
})();