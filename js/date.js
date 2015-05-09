(function () {
	Date.prototype.addHours = function addHours (h) {
    	this.setHours(this.getHours() + h);
    	this.timeRemaining();
    	return this;
	}
	Date.prototype.addMinutes = function addMinutes (m) {
    	this.setMinutes(this.getMinutes() + m);
    	this.timeRemaining();
    	return this;
	}
	Date.prototype.expired = function expired () {
		if (typeof this.hoursRemaining === "undefined" || typeof this.minutesRemaining === "undefined" || typeof this.secondsRemaining === "undefined") {
			throw "Remaining time properties are undefined. Call 'timeRemaining' on date before evaluating it's expiration."
		}

		if (this.hoursRemaining === 0 && this.minutesRemaining === 0 && this.secondsRemaining === 0) {
			return true;
		} else {
			return false;
		}
	}
	Date.prototype.timeRemaining = function timeRemaining () {
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
})();