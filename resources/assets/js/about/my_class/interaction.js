export default function() {
		function interaction() {
			this.mouse = bind(this.mouse, this);
			this.getNormalizeDeviceAng = bind(this.getNormalizeDeviceAng, this);
			this.getNormalizeMousePos = bind(this.getNormalizeMousePos, this);
			this._eDeviceOrientation = bind(this._eDeviceOrientation, this);
			this._eDeviceMotion = bind(this._eDeviceMotion, this);
			this._eMouseMove = bind(this._eMouseMove, this);
			this._eTouchEnd = bind(this._eTouchEnd, this);
			this._eTouchStart = bind(this._eTouchStart, this);
			this._eClick = bind(this._eClick, this);
			this.addOnClick = bind(this.addOnClick, this);
			this.update = bind(this.update, this);
			this.start = bind(this.start, this);
			this._mouse;
			this._u = root.MY.myfw.util;
			this._onClick = [];
			this._device = {
				ax: 0,
				ay: 0,
				az: 0
			};
			this._deviceMotionCnt = 0;
		}

		interaction.prototype.start = function() {
			this._mouse = new root.MY_CLASS.mouse();
			this._mouse.x = root.MY.myfw.stageWidth() * 0.5;
			this._mouse.y = root.MY.myfw.stageHeight() * 0.5;
			if (root.MY.myfw.conf.IS_SMT) {
				$("body").bind("touchmove", this._eMouseMove);
				$("body").bind("touchstart", this._eTouchStart);
				$("body").bind("touchend", this._eTouchEnd);
				window.addEventListener("devicemotion", this._eDeviceMotion);
				this._mouse.x = -999;
				this._mouse.y = -999;
			} else {
				$("body").bind("mousemove", this._eMouseMove);
				$("body").bind("click", this._eClick);
			}
			return root.MY.myfw.addUpdate(this.update);
		};

		interaction.prototype.update = function() {
			var ease;
			if (root.MY.myfw.conf.IS_SMT) {
				ease = 0.2;
				this._mouse.ax += (this._device.ax - this._mouse.ax) * ease;
				this._mouse.ay += (this._device.ay - this._mouse.ay) * ease;
				return this._mouse.az += (this._device.az - this._mouse.az) * ease;
			}
		};

		interaction.prototype.addOnClick = function(f) {
			return this._onClick.push(f);
		};

		interaction.prototype._eClick = function(e) {
			var i, j, len1, ref, results, val;
			this._eMouseMove(e);
			ref = this._onClick;
			results = [];
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				if (val != null) {
					results.push(val(this._mouse));
				} else {
					results.push(void 0);
				}
			}
			return results;
		};

		interaction.prototype._eTouchStart = function(e) {
			var i, j, len1, ref, results, val;
			this._mouse.isDown = true;
			this._eMouseMove(e);
			ref = this._onClick;
			results = [];
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				if (val != null) {
					results.push(val(this._mouse));
				} else {
					results.push(void 0);
				}
			}
			return results;
		};

		interaction.prototype._eTouchEnd = function(e) {
			this._mouse.isDown = false;
			this._mouse.x = -999;
			return this._mouse.y = -999;
		};

		interaction.prototype._eMouseMove = function(e) {
			var touches;
			if (root.MY.myfw.conf.IS_SMT && this._mouse.isDown) {
				touches = event.touches;
				event.preventDefault();
				if ((touches != null) && touches.length > 0) {
					this._mouse.xOld = this._mouse.x;
					this._mouse.yOld = this._mouse.y;
					this._mouse.x = touches[0].pageX;
					return this._mouse.y = touches[0].pageY;
				}
			} else {
				this._mouse.xOld = this._mouse.x;
				this._mouse.yOld = this._mouse.y;
				this._mouse.x = e.clientX;
				return this._mouse.y = e.clientY;
			}
		};

		interaction.prototype._eDeviceMotion = function(e) {
			var ac, acx, acy, acz, ax, ay, az;
			ac = e.accelerationIncludingGravity;
			acx = ac.x;
			acy = ac.y;
			acz = ac.z;
			ax = Math.floor(Math.atan2(acx, acz) / Math.PI * 180) || 0;
			ay = Math.floor(Math.atan2(acy, acz) / Math.PI * 180) || 0;
			az = Math.floor(Math.atan2(acy, acx) / Math.PI * 180) || 0;
			if (ax < 0) {
				ax += 360;
			}
			if (ay < 0) {
				ay += 360;
			}
			if (az < 0) {
				az += 360;
			}
			this._device.ax = ax;
			this._device.ay = ay;
			return this._device.az = az;
		};

		interaction.prototype._eDeviceOrientation = function(e) {
			var heading;
			heading = e.webkitCompassHeading;
			if (heading != null) {
				if (this._mouse.startHeading === 0) {
					this._mouse.startHeading = heading;
				}
				this._mouse.heading = heading;
				this._mouse.alpha = e.alpha;
				this._mouse.beta = e.beta;
				return this._mouse.gamma = e.gamma;
			}
		};

		interaction.prototype.getNormalizeMousePos = function() {
			var h, w;
			w = root.MY.myfw.stageWidth();
			h = root.MY.myfw.stageHeight();
			return {
				x: this._u.map(this._mouse.x, 0, 1, 0, w),
				y: this._u.map(this._mouse.y, 0, 1, 0, h)
			};
		};

		interaction.prototype.getNormalizeDeviceAng = function() {
			var baseHeading, dh, h, offsetHeading;
			baseHeading = 180;
			offsetHeading = baseHeading - this._mouse.startHeading;
			h = this._mouse.heading + offsetHeading;
			if (h > 360) {
				h -= 360;
			}
			if (h < 0) {
				h += 360;
			}
			dh = h - baseHeading;
			switch (window.orientation) {
				case 90:
					return {
						x: this._u.map(this._mouse.ay, 0, 1, 180 - 360, 180 + 360),
						y: 0.5
					};
				case -90:
					return {
						x: this._u.map(this._mouse.ay, 1, 0, 180 - 360, 180 + 360),
						y: 0.5
					};
				default:
					return {
						x: this._u.map(this._mouse.ax, 1, 0, 180 - 360, 180 + 360),
						y: 0.5
					};
			}
		};

		interaction.prototype.mouse = function() {
			return this._mouse;
		};

		return interaction;

	}