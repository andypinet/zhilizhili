export default function(superClass) {
		extend(rect2d, superClass);

		function rect2d(option) {
			this.show = bind(this.show, this);
			this.update = bind(this.update, this);
			this.dispose2 = bind(this.dispose2, this);
			this.addStage = bind(this.addStage, this);
			rect2d.__super__.constructor.call(this, {
				update: true
			});
			this._option = option;
			this._rect;
			this._anm = {};
		}

		rect2d.prototype.addStage = function() {
			this._rect = new root._LIBS.display();
			this.addChild(this._rect);
			this._rect.size(9, this._option.h || 42);
			this._rect.bgColor(this._option.color);
			this._rect.set3d(this.width() * 0.5, 0);
			this._anm.show = new root._LIBS.animation();
			return this.visible(false);
		};

		rect2d.prototype.dispose2 = function() {
			if (this._rect != null) {
				this._rect.dispose();
				this._rect = null;
			}
			if ((this._anm != null) && (this._anm.show != null)) {
				this._anm.show.dispose();
				this._anm.show = null;
				this._anm = null;
			}
			return this._option = null;
		};

		rect2d.prototype.update = function() {
			if (!this._anm.show.isCompleted()) {
				this._rect.scale(1, this._anm.show.get("scaleY"));
				this._rect.setTransform();
				return this._rect.alpha(this._anm.show.get("opacity"));
			}
		};

		rect2d.prototype.show = function(d) {
			this.visible(true);
			this._anm.show.set({
				scaleY: {
					from: 0,
					to: 1
				},
				opacity: {
					from: 0,
					to: 1
				},
				frame: 80,
				delay: d || 0,
				ease: "easeInOutExpo"
			});
			this._anm.show.start();
			return this.update();
		};

		return rect2d;

	}