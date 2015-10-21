export default function(superClass) {
		extend(dot2d, superClass);

		function dot2d() {
			this.stop = bind(this.stop, this);
			this.start = bind(this.start, this);
			this.update = bind(this.update, this);
			this.dispose2 = bind(this.dispose2, this);
			this.addStage = bind(this.addStage, this);
			dot2d.__super__.constructor.call(this, {
				update: true
			});
			this._ang = 0;
			this._isAnimation = false;
		}

		dot2d.prototype.addStage = function() {
			var size;
			if (this._isSmt) {
				this.elm().css({
					"border-radius": "2px"
				});
			} else {
				this.elm().css({
					"border-radius": "4px"
				});
			}
			this.bgColor("#FFF");
			size = [12, 6][this._device];
			return this.size(size, size);
		};

		dot2d.prototype.dispose2 = function() {};

		dot2d.prototype.update = function() {
			var opacity;
			if (this._isAnimation) {
				this._ang += 16;
				opacity = this._u.map(Math.sin(this._u.radian(this._ang)), 0.5, 1, -1, 1);
				return this.alpha(opacity);
			}
		};

		dot2d.prototype.start = function(ang) {
			this._isAnimation = true;
			this._ang = ang;
			return this.update();
		};

		dot2d.prototype.stop = function() {
			return this._isAnimation = false;
		};

		return dot2d;

	}