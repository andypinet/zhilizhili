export default function(superClass) {
		extend(startBtn, superClass);

		function startBtn(imgName, isRetine) {
			this.stopEffect = bind(this.stopEffect, this);
			this._eOut = bind(this._eOut, this);
			this._eOver = bind(this._eOver, this);
			this._eClick = bind(this._eClick, this);
			this._setEffect = bind(this._setEffect, this);
			this._updateEffect = bind(this._updateEffect, this);
			this.update = bind(this.update, this);
			this.dispose2 = bind(this.dispose2, this);
			this.addStage = bind(this.addStage, this);
			startBtn.__super__.constructor.call(this, {
				update: true
			});
			this._imgName = imgName;
			this._isRetina = isRetine;
			this._btnImg;
			this._effect;
			this._toColor;
			this._fromColor;
			this._tgColor = [];
			this._isEffectUpdate = true;
			this._isOver = false;
			this.onClick;
			this.onLoad;
		}

		startBtn.prototype.addStage = function() {
			if (!Modernizr.cssgradients) {
				this._imgName = this._imgName.replace(".png", "_nog.png");
			}
			this._btnImg = new root.MY_CLASS.imgBtn2d(this._imgName, this._isRetina, {
				opacity: 1
			});
			this._btnImg.onLoad = this._setEffect;
			this._btnImg.onClick = this._eClick;
			this._btnImg.onOver = this._eOver;
			this._btnImg.onOut = this._eOut;
			return this.addChild(this._btnImg);
		};

		startBtn.prototype.dispose2 = function() {
			if (this._btnImg != null) {
				this._btnImg.dispose();
				this._btnImg = null;
			}
			if (this._effect != null) {
				this._effect.dispose();
				this._effect = null;
			}
			this._toColor = null;
			this._fromColor = null;
			this._tgColor = null;
			this.onClick = null;
			return this.onLoad = null;
		};

		startBtn.prototype.update = function() {
			return this._updateEffect();
		};

		startBtn.prototype._updateEffect = function() {
			var ease, key0, key1, p, t0, t1;
			if ((this._effect != null) && this._isEffectUpdate) {
				p = 0.002;
				key0 = ~~(Date.now() * p % this._tgColor.length);
				key1 = key0 + 1;
				if (key1 >= this._tgColor.length) {
					key1 = 0;
				}
				t0 = this._tgColor[key0];
				t1 = this._tgColor[key1];
				ease = 0.04;
				this._toColor.r += (t0.r - this._toColor.r) * ease;
				this._toColor.g += (t0.g - this._toColor.g) * ease;
				this._toColor.b += (t0.b - this._toColor.b) * ease;
				this._fromColor.r += (t1.r - this._fromColor.r) * ease;
				this._fromColor.g += (t1.g - this._fromColor.g) * ease;
				this._fromColor.b += (t1.b - this._fromColor.b) * ease;
				return this._effect.elm().css({
					background: "-moz-linear-gradient(left top, #" + this._toColor.getHexString() + ", #" + this._fromColor.getHexString() + ")",
					background: "-webkit-gradient(linear, left top, right bottom, from(#" + this._toColor.getHexString() + "), to(#" + this._fromColor.getHexString() + "))"
				});
			}
		};

		startBtn.prototype._setEffect = function() {
			var c, i, j, len1, ref, val;
			this.size(this._btnImg.width(), this._btnImg.height());
			if (Modernizr.cssgradients && !this._isSmt) {
				this._effect = new root._LIBS.display();
				this.unshiftChild(this._effect);
				this._effect.size(160, 40);
				this._effect.xy(~~(this.width() * 0.5 - this._effect.width() * 0.5), ~~(this.height() * 0.5 - this._effect.height() * 0.5));
				ref = root.MY.app.conf.START_BTN_COLOR;
				for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
					val = ref[i];
					c = new THREE.Color(val);
					this._tgColor.push(c);
				}
				this._toColor = this._tgColor[0].clone();
				this._fromColor = this._tgColor[1].clone();
			}
			if (this.onLoad != null) {
				return this.onLoad();
			}
		};

		startBtn.prototype._eClick = function() {
			if (this.onClick != null) {
				return this.onClick();
			}
		};

		startBtn.prototype._eOver = function() {};

		startBtn.prototype._eOut = function() {};

		startBtn.prototype.stopEffect = function() {
			return this._isEffectUpdate = false;
		};

		return startBtn;

	}