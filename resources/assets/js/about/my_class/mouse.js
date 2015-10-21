export default function() {
		function mouse() {
			this.x = 0;
			this.y = 0;
			this.xOld = 0;
			this.yOld = 0;
			this.ax = 0;
			this.ay = 0;
			this.az = 0;
			this.axOld = -1;
			this.ayOld = -1;
			this.azOld = -1;
			this.heading = 0;
			this.startHeading = 0;
			this.alpha = 0;
			this.beta = 0;
			this.gamma = 0;
			this.isDown = false;
		}

		return mouse;

	}