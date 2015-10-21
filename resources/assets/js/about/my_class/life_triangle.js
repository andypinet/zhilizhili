export default function(superClass) {
		extend(lifeTriangle, superClass);

		function lifeTriangle(option) {
			this.reset = bind(this.reset, this);
			this.lifeUp = bind(this.lifeUp, this);
			this.hide = bind(this.hide, this);
			this.show = bind(this.show, this);
			this.draw = bind(this.draw, this);
			this.updateColor2 = bind(this.updateColor2, this);
			this.updateColor = bind(this.updateColor, this);
			this.dispose2 = bind(this.dispose2, this);
			this.update = bind(this.update, this);
			this.addStage = bind(this.addStage, this);
			lifeTriangle.__super__.constructor.call(this, {
				update: true
			});
			this._option = option;
			this._tri;
			this._color;
			this.centerX = 0;
			this._isShow = true;
			this._isColorAnimation = this._u.isChrome() && !this._isSmt;
		}

		lifeTriangle.prototype.addStage = function() {
			this._option.ts = this._option.defS = this._option.s;
			this._option.tl = this._option.defL = this._option.l;
			this._color = new THREE.Color();
			this._color.setHSL(this._option.h, this._option.s, this._option.l);
			this._tri = new root._LIBS.display();
			this.addChild(this._tri);
			if (this._option.isTop) {
				this._tri.elm().css({
					width: 0,
					height: 0,
					borderTop: this._option.height + "px solid #" + this._color.getHexString(),
					borderRight: (this._option.width * 0.5) + "px solid transparent",
					borderBottom: "0px solid transparent",
					borderLeft: (this._option.width * 0.5) + "px solid transparent"
				});
			} else {
				this._tri.elm().css({
					width: 0,
					height: 0,
					borderBottom: this._option.height + "px solid #" + this._color.getHexString(),
					borderRight: (this._option.width * 0.5) + "px solid transparent",
					borderTop: "0px solid transparent",
					borderLeft: (this._option.width * 0.5) + "px solid transparent"
				});
			}
			return this.update();
		};

		lifeTriangle.prototype.update = function() {
			if (this.visible() && this._isColorAnimation) {
				this.updateColor();
				return this.draw();
			}
		};

		lifeTriangle.prototype.dispose2 = function() {};

		lifeTriangle.prototype.updateColor = function() {
			var cEase0, cEase1, h, life;
			if ((root.MY.gl.game != null) && this.visible()) {
				life = root.MY.gl.game.life();
				h = this._u.map(life, 0, 117, 0.2, 1) / 360;
				cEase0 = 0.1;
				cEase1 = 0.5;
				this._option.ts += (this._option.defS - this._option.ts) * cEase0;
				this._option.s += (this._option.ts - this._option.s) * cEase1;
				this._option.tl += (this._option.defL - this._option.tl) * cEase0;
				this._option.l += (this._option.tl - this._option.l) * cEase1;
				return this._color.setHSL(h, this._option.s, this._option.l);
			}
		};

		lifeTriangle.prototype.updateColor2 = function(h) {
			if (root.MY.gl.game != null) {
				return this._color.setHSL(h / 360, this._option.s, this._option.l);
			}
		};

		lifeTriangle.prototype.draw = function() {
			if (this.visible()) {
				if (this._option.isTop) {
					return this._tri.elm().css({
						borderTop: this._option.height + "px solid #" + this._color.getHexString()
					});
				} else {
					return this._tri.elm().css({
						borderBottom: this._option.height + "px solid #" + this._color.getHexString()
					});
				}
			}
		};

		lifeTriangle.prototype.show = function(isAnimate) {
			return this.visible(true);
		};

		lifeTriangle.prototype.hide = function(isAnimate) {
			return this.visible(false);
		};

		lifeTriangle.prototype.lifeUp = function() {
			if (this._isColorAnimation) {
				this._option.ts = 1;
				return this._option.tl = 1;
			}
		};

		lifeTriangle.prototype.reset = function() {
			this._option.s = this._option.ts = this._option.defS;
			this._option.l = this._option.tl = this._option.defL;
			this._color.setHSL(this._option.h, this._option.s, this._option.l);
			this.visible(true);
			this.draw();
			return this.visible(false);
		};

		return lifeTriangle;

	}