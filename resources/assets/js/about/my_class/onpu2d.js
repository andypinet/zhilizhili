export default function(superClass) {
		extend(onpu2d, superClass);

		function onpu2d(parent, key) {
			this.hide = bind(this.hide, this);
			this._startEffect = bind(this._startEffect, this);
			this._makeEffect = bind(this._makeEffect, this);
			this._isContainMouse = bind(this._isContainMouse, this);
			this.show = bind(this.show, this);
			this.getOnpuSize = bind(this.getOnpuSize, this);
			this._setTransform = bind(this._setTransform, this);
			this._eCompleteOnpu = bind(this._eCompleteOnpu, this);
			this.setBasePos = bind(this.setBasePos, this);
			this._updateOnpu = bind(this._updateOnpu, this);
			this._updateEffect = bind(this._updateEffect, this);
			this.update = bind(this.update, this);
			this.dispose2 = bind(this.dispose2, this);
			this.addStage = bind(this.addStage, this);
			onpu2d.__super__.constructor.call(this, {
				update: true
			});
			this._parent = parent;
			this._key = key;
			this._param = {
				baseScale: 1,
				baseX: 0,
				baseY: 0,
				onpuX: 0,
				onpuY: 0,
				onpuVX: 0,
				onpuVY: 0,
				onpuOffsetX: 0,
				onpuOffsetY: 0,
				onpuTgOffsetX: 0,
				onpuTgOffsetY: 0,
				onpuRot: 0
			};
			this._anm;
			this._onpuImg;
			this._isSmt = root.MY.myfw.conf.IS_SMT;
			this._effect = [];
			this._floater;
			this._interaction;
			this._isEffect = false;
			this._isHide = false;
		}

		onpu2d.prototype.addStage = function() {
			var start;
			this._interaction = root.MY.gl.interaction;
			this._makeEffect();
			this._onpuImg = new root._LIBS.displayImage(root.MY.app.conf.PATH_IMG.LOADING + "onpu" + this._key + ".png", root.MY.app.conf.IMG_RETINA);
			this._onpuImg.onLoad = this._eCompleteOnpu;
			this.addChild(this._onpuImg);
			start = this._key * 40;
			this._floater = new root._LIBS.float(this._param, [
				{
					target: "onpuX",
					range: 4,
					speed: 1,
					start: start
				}, {
					target: "onpuY",
					range: 20,
					speed: 2,
					start: start
				}, {
					target: "onpuRot",
					range: 16,
					speed: 2,
					start: start
				}
			]);
			this._anm = new root._LIBS.animation();
			return this.visible(false);
		};

		onpu2d.prototype.dispose2 = function() {
			var i, j, len1, ref, val;
			if (this._anm != null) {
				this._anm.dispose();
				this._anm = null;
			}
			if (this._onpuImg != null) {
				this._onpuImg.dispose();
				this._onpuImg = null;
			}
			if (this._effect != null) {
				ref = this._effect;
				for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
					val = ref[i];
					val.tg.dispose();
					val.anm.dispose();
					this._effect[i] = null;
				}
				this._effect = null;
			}
			if (this._floater != null) {
				this._floater.dispose();
				this._floater = null;
			}
			this._parent = null;
			this._param = null;
			return this._interaction = null;
		};

		onpu2d.prototype.update = function() {
			this._floater.update();
			if (this._isSmt) {
				if (!this._isEffect && this._isContainMouse()) {
					this._startEffect();
				}
			}
			this._updateEffect();
			this._updateOnpu();
			return this._setTransform();
		};

		onpu2d.prototype._updateEffect = function() {
			var anm, cnt, i, j, len1, ref, s, tg, val;
			if (this._isEffect) {
				cnt = 0;
				ref = this._effect;
				for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
					val = ref[i];
					tg = val.tg;
					anm = val.anm;
					if (anm.isStart()) {
						tg.visible(true);
						s = anm.get("scale");
						tg.scale(s, s, s);
						tg.setTransform();
						tg.alpha(anm.get("opacity"));
						if (anm.isCompleted()) {
							cnt++;
							tg.visible(false);
						}
					}
				}
				if (cnt >= this._effect.length) {
					return this._isEffect = false;
				}
			}
		};

		onpu2d.prototype._updateOnpu = function() {
			var ease0, p;
			ease0 = 0.2;
			this._param.onpuTgOffsetX += (0 - this._param.onpuTgOffsetX) * ease0;
			this._param.onpuTgOffsetY += (0 - this._param.onpuTgOffsetY) * ease0;
			p = 0.4;
			this._param.onpuVX += (this._param.onpuTgOffsetX - this._param.onpuOffsetX) * p;
			this._param.onpuVY += (this._param.onpuTgOffsetY - this._param.onpuOffsetY) * p;
			this._param.onpuOffsetX += (this._param.onpuVX *= p);
			return this._param.onpuOffsetY += (this._param.onpuVY *= p);
		};

		onpu2d.prototype.setBasePos = function(x, y, scale) {
			this._param.baseX = x;
			this._param.baseY = y;
			return this._param.baseScale = scale;
		};

		onpu2d.prototype._eCompleteOnpu = function(w, h) {
			this._onpuImg.xy(~~(-this._onpuImg.width() * 0.5), ~~(-this._onpuImg.height() * 0.5));
			if (!this._isSmt) {
				this._onpuImg.elm().bind("mouseover", this._startEffect);
			}
			return this._parent.resize(w, h);
		};

		onpu2d.prototype._setTransform = function() {
			var onpuX, onpuY, rot, scale, x, y;
			x = this._param.baseX;
			y = this._param.baseY;
			if (this._anm.isCompleted()) {
				rot = 0;
				scale = this._param.baseScale;
			} else {
				rot = this._anm.get("rot");
				scale = this._anm.get("scale");
			}
			this.translate(x, y);
			this.rotate(0, 0, rot);
			this.scale(scale, scale);
			this.setTransform();
			onpuX = this._param.onpuX + this._param.onpuOffsetX;
			onpuY = this._param.onpuY + this._param.onpuOffsetY;
			this._onpuImg.translate(onpuX, onpuY);
			this._onpuImg.rotate(0, 0, this._param.onpuRot);
			return this._onpuImg.setTransform();
		};

		onpu2d.prototype.getOnpuSize = function() {
			return {
				width: this._onpuImg.width(),
				height: this._onpuImg.height()
			};
		};

		onpu2d.prototype.show = function() {
			if (this.visible()) {
				return;
			}
			this.visible(true);
			this._anm.set({
				scale: {
					from: 0,
					to: 1
				},
				rot: {
					from: this._u.range(90),
					to: 0
				},
				frame: 40,
				delay: 0,
				ease: "bounceOut"
			});
			return this._anm.start();
		};

		onpu2d.prototype._isContainMouse = function() {
			var x, y;
			if (this._onpuImg.width() <= 0) {
				return false;
			}
			x = this._interaction.mouse().x;
			y = this._interaction.mouse().y;
			if (x >= this._param.baseX - this._onpuImg.width() * 0.5 && x <= this._param.baseX + this._onpuImg.width() * 0.5 && y >= this._param.baseY - this._onpuImg.height() * 0.5 && y <= this._param.baseY + this._onpuImg.height() * 0.5) {
				return true;
			} else {
				return false;
			}
		};

		onpu2d.prototype._makeEffect = function() {
			var anm, circle, color, i, num, obj, results;
			i = 0;
			num = 2;
			results = [];
			while (i < num) {
				color = new THREE.Color(root.MY.app.conf.RAINBOW_COLOR[this._key]);
				circle = new root.MY_CLASS.circle2d({
					color: "#" + color.getHexString(),
					key: this._key,
					fill: i % 2 === 0
				});
				this.addChild(circle);
				circle.visible(false);
				anm = new root._LIBS.animation();
				obj = {
					tg: circle,
					anm: anm
				};
				this._effect.push(obj);
				results.push(i++);
			}
			return results;
		};

		onpu2d.prototype._startEffect = function() {
			var anm, i, j, len1, oldX, oldY, ref, tg, val, x, y;
			if (this._isHide) {
				return;
			}
			if (this._isSmt && this._isEffect) {
				return;
			}
			this._isEffect = true;
			ref = this._effect;
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				tg = val.tg;
				anm = val.anm;
				if (i === 0) {
					anm.set({
						scale: {
							from: 0,
							to: 1
						},
						opacity: {
							from: 0.5,
							to: 0
						},
						frame: 30,
						delay: 0,
						ease: "easeOutExpo"
					});
					anm.start();
				} else {
					anm.set({
						scale: {
							from: 0.25,
							to: 1
						},
						opacity: {
							from: 1,
							to: 0
						},
						frame: 30,
						delay: 0,
						ease: "easeInOutExpo"
					});
					anm.start();
				}
			}
			x = this._interaction.mouse().x;
			y = this._interaction.mouse().y;
			oldX = this._interaction.mouse().xOld;
			oldY = this._interaction.mouse().yOld;
			this._param.onpuTgOffsetX = (x - oldX) * 1;
			return this._param.onpuTgOffsetY = (y - oldY) * 1;
		};

		onpu2d.prototype.hide = function() {
			return this._isHide = true;
		};

		return onpu2d;

	}