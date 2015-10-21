export default function(superClass) {
		extend(circle2d, superClass);

		function circle2d(option) {
			this._eCompleteShape = bind(this._eCompleteShape, this);
			this.update = bind(this.update, this);
			this.dispose2 = bind(this.dispose2, this);
			this.addStage = bind(this.addStage, this);
			circle2d.__super__.constructor.call(this, {
				update: true
			});
			this._option = option;
			this._shape;
		}

		circle2d.prototype.addStage = function() {
			this.elm().css({
				"pointer-events": "none"
			});
			if (this._option.fill) {
				this._shape = new root._LIBS.circleView(this._option.color);
				this.addChild(this._shape);
				this._shape.size(100);
				return this._eCompleteShape();
			} else {
				this._shape = new root._LIBS.displayImage(root.MY.app.conf.PATH_IMG.LOADING + "waku" + this._option.key + ".png", root.MY.app.conf.IMG_RETINA);
				this._shape.onLoad = this._eCompleteShape;
				return this.addChild(this._shape);
			}
		};

		circle2d.prototype.dispose2 = function() {
			if (this._shape != null) {
				this._shape.dispose();
				this._shape = null;
			}
			return this._option = null;
		};

		circle2d.prototype.update = function() {};

		circle2d.prototype._eCompleteShape = function() {
			return this._shape.xy(~~(-this._shape.width() * 0.5), ~~(-this._shape.height() * 0.5));
		};

		return circle2d;

	}