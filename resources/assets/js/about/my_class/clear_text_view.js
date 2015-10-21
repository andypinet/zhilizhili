export default function(superClass) {
		extend(clearTextView, superClass);

		function clearTextView(option) {
			this.hide = bind(this.hide, this);
			this.show = bind(this.show, this);
			this.setBgColor = bind(this.setBgColor, this);
			this.dispose2 = bind(this.dispose2, this);
			this.resize = bind(this.resize, this);
			this._updateHide = bind(this._updateHide, this);
			this._updateShow = bind(this._updateShow, this);
			this.update = bind(this.update, this);
			this.addStage = bind(this.addStage, this);
			clearTextView.__super__.constructor.call(this, {
				resize: true,
				update: true
			});
			this._option = option;
			this._bg;
			this._anm = {};
			this._status = 0;
			this._conf = root.MY.app.conf;
		}

		clearTextView.prototype.addStage = function() {
			this._bg = new root._LIBS.display();
			this.addChild(this._bg);
			this._bg.elm().css({
				"border-radius": "8px"
			});
			this._bg.bgColor(this._option.bgColor);
			this._bg.alpha(0.8);
			if (this._isSmt) {
				this._bg.size(670 / 2, 270 / 2);
			} else {
				this._bg.size(670, 270);
			}
			this.set3d(this._bg.width() * 0.5, this._bg.height() * 0.5);
			this._anm.show = new root._LIBS.animation();
			this._anm.hide = new root._LIBS.animation();
			return this.visible(false);
		};

		clearTextView.prototype.update = function() {
			this._updateShow();
			return this._updateHide();
		};

		clearTextView.prototype._updateShow = function() {
			var s;
			if (this._status === 1 && !this._anm.show.isCompleted()) {
				s = this._anm.show.get("scale");
				this.scale(s, s);
				this.setTransform();
				this.alpha(this._anm.show.get("opacity"));
				if (this._anm.show.isCompleted()) {
					return this._status = 2;
				}
			}
		};

		clearTextView.prototype._updateHide = function() {
			var s;
			if (this._status === 3 && !this._anm.hide.isCompleted()) {
				s = this._anm.hide.get("scale");
				this.scale(s, s);
				this.setTransform();
				this.alpha(this._anm.hide.get("opacity"));
				if (this._anm.hide.isCompleted()) {
					this.visible(false);
					return this._status = 4;
				}
			}
		};

		clearTextView.prototype.resize = function(w, h) {
			if (this._isSmt) {
				return this.xy(~~(w * 0.5 - this._bg.width() * 0.5), ~~(h * 0.45 - this._bg.height() * 0.5));
			} else {
				return this.xy(~~(w * 0.5 - this._bg.width() * 0.5), ~~(h * 0.5 - this._bg.height() * 0.5));
			}
		};

		clearTextView.prototype.dispose2 = function() {};

		clearTextView.prototype.setBgColor = function(color) {
			this._option.bgColor = color;
			return this._bg.bgColor(this._option.bgColor);
		};

		clearTextView.prototype.show = function(delay) {
			if (this._status === 1) {
				return;
			}
			this._status = 1;
			this.visible(true);
			this._anm.hide.reset();
			if (this._isSmt) {
				this._anm.show.set({
					scale: {
						from: 0.25,
						to: 1
					},
					opacity: {
						from: 1,
						to: 1
					},
					frame: 60,
					delay: delay || 0,
					ease: "easeOutExpo"
				});
			} else {
				this._anm.show.set({
					scale: {
						from: 0.25,
						to: 1
					},
					opacity: {
						from: 0,
						to: 1
					},
					frame: 80,
					delay: delay || 0,
					ease: "easeInOutExpo"
				});
			}
			this._anm.show.start();
			return this.update();
		};

		clearTextView.prototype.hide = function(delay) {
			if (this._status === 3) {
				return;
			}
			this._status = 3;
			if (this._isSmt) {
				this.visible(false);
				this._status = 4;
				return this._anm.show.reset();
			} else {
				this.visible(true);
				this._anm.show.reset();
				this._anm.hide.set({
					scale: {
						from: 1,
						to: 1.75
					},
					opacity: {
						from: 1,
						to: 0
					},
					frame: 80,
					delay: delay || 0,
					ease: "easeInOutExpo"
				});
				this._anm.hide.start();
				return this.update();
			}
		};

		return clearTextView;

	}