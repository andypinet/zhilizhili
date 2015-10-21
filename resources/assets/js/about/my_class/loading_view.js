export default function(superClass) {
		extend(loadingView, superClass);

		function loadingView(elm) {
			this.setLoading = bind(this.setLoading, this);
			this.hide = bind(this.hide, this);
			this._updateHide = bind(this._updateHide, this);
			this.update = bind(this.update, this);
			this._setOnpuPos = bind(this._setOnpuPos, this);
			this.resize = bind(this.resize, this);
			this.dispose2 = bind(this.dispose2, this);
			this.addStage = bind(this.addStage, this);
			loadingView.__super__.constructor.call(this, elm, {
				resize: true,
				update: true
			});
			this._soundTxt;
			this._onpu = [];
			this._onpuPos = [];
			this._onpuPosAnm = [];
			this._rate = 0;
			this._isHide = false;
			this._isHided = false;
			this.onHided;
		}

		loadingView.prototype.addStage = function() {
			var anm, i, num, onpu, pos, results;
			this._soundTxt = new root._LIBS.displayImage(root.MY.app.conf.PATH_IMG.LOADING + "sound.png", root.MY.app.conf.IMG_RETINA);
			this._soundTxt.onLoad = this.resize;
			this.addChild(this._soundTxt);
			this._soundTxt.elm().css({
				opacity: 0
			}).animate({
				opacity: 1
			}, 1200);
			i = 0;
			num = 7;
			results = [];
			while (i < num) {
				onpu = new root.MY_CLASS.onpu2d(this, i);
				this.addChild(onpu);
				this._onpu.push(onpu);
				pos = new root._LIBS.point3d(0, 0, 0);
				this._onpuPos.push(pos);
				anm = new root._LIBS.animation();
				this._onpuPosAnm.push(anm);
				results.push(i++);
			}
			return results;
		};

		loadingView.prototype.dispose2 = function() {
			var i, j, k, len1, len2, len3, n, ref, ref1, ref2, val;
			if (this._soundTxt != null) {
				this._soundTxt.dispose();
				this._soundTxt = null;
			}
			if (this._onpu != null) {
				ref = this._onpu;
				for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
					val = ref[i];
					val.dispose();
					this._onpu[i] = null;
				}
				this._onpu = null;
			}
			if (this._onpuPos != null) {
				ref1 = this._onpuPos;
				for (i = k = 0, len2 = ref1.length; k < len2; i = ++k) {
					val = ref1[i];
					val.dispose();
					this._onpuPos[i] = null;
				}
				this._onpuPos = null;
			}
			if (this._onpuPosAnm != null) {
				ref2 = this._onpuPosAnm;
				for (i = n = 0, len3 = ref2.length; n < len3; i = ++n) {
					val = ref2[i];
					val.dispose();
					this._onpuPosAnm[i] = null;
				}
				this._onpuPosAnm = null;
			}
			return this.onHided = null;
		};

		loadingView.prototype.resize = function(w, h) {
			this.size(w, h);
			if (this._isSmt) {
				this._soundTxt.xy(~~(w * 0.5 - this._soundTxt.width() * 0.5), ~~(h * 0.5 - this._soundTxt.height() * 0.5) + 110 / 2);
			} else {
				this._soundTxt.xy(~~(w * 0.5 - this._soundTxt.width() * 0.5), ~~(h * 0.5 - this._soundTxt.height() * 0.5) + 110);
			}
			return this._setOnpuPos(w, h);
		};

		loadingView.prototype._setOnpuPos = function(w, h) {
			var i, interval, j, k, len1, len2, offsetY, onpuW, pos, ref, ref1, results, totalWidth, val;
			onpuW = 0;
			ref = this._onpu;
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				if (val.getOnpuSize().width > onpuW) {
					onpuW = val.getOnpuSize().width;
				}
			}
			if (onpuW === 0) {
				return;
			}
			interval = ~~(onpuW * 0.75);
			totalWidth = (onpuW + interval) * this._onpu.length - interval;
			ref1 = this._onpu;
			results = [];
			for (i = k = 0, len2 = ref1.length; k < len2; i = ++k) {
				val = ref1[i];
				offsetY = val.getOnpuSize().height * 0.3;
				if (i % 2 === 0) {
					offsetY *= -1;
				}
				pos = this._onpuPos[i];
				pos.setVanishingPoint(w * 0.5, h * 0.5);
				pos.x = i * (onpuW + interval) - totalWidth * 0.5 + onpuW * 0.5;
				pos.y = offsetY;
				results.push(val.setBasePos(pos.screenX(), pos.screenY(), pos.scale()));
			}
			return results;
		};

		loadingView.prototype.update = function() {
			return this._updateHide();
		};

		loadingView.prototype._updateHide = function() {
			var anm, hidedCnt, i, j, len1, onpu, ref, val;
			if (this._isHide && !this._isHided) {
				hidedCnt = 0;
				ref = this._onpuPos;
				for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
					val = ref[i];
					anm = this._onpuPosAnm[i];
					val.z = anm.get("z");
					onpu = this._onpu[i];
					onpu.setBasePos(val.screenX(), val.screenY(), val.scale());
					onpu.alpha(anm.get("opacity"));
					if (anm.isCompleted()) {
						onpu.visible(false);
						hidedCnt++;
					}
				}
				if (hidedCnt >= this._onpuPos.length) {
					this._isHided = true;
					if (this.onHided != null) {
						return this.onHided();
					}
				}
			}
		};

		loadingView.prototype.hide = function() {
			var delay, i, j, len1, onpu, ref, val;
			if (this._isHide) {
				return;
			}
			this._isHide = true;
			delay = 2 * 60;
			ref = this._onpuPosAnm;
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				val.set({
					z: {
						from: 0,
						to: -800
					},
					opacity: {
						from: 1,
						to: 0
					},
					frame: 70,
					delay: delay + (3 - Math.abs(3 - i)) * 3,
					ease: "easeInOutExpo"
				});
				val.start();
				onpu = this._onpu[i];
				onpu.hide();
			}
			return this.delay((function(_this) {
				return function() {
					return _this._soundTxt.elm().animate({
						opacity: 0
					}, 400);
				};
			})(this), 2000, 0);
		};

		loadingView.prototype.setLoading = function(rate, key) {
			var i, num, results;
			this._rate = 0;
			i = 0;
			while (i < key) {
				this._rate += root.MY.app.conf.LOADING_RATE[i];
				i++;
			}
			this._rate += root.MY.app.conf.LOADING_RATE[key] * rate;
			i = 0;
			num = ~~(this._rate * this._onpu.length);
			results = [];
			while (i < num) {
				this._onpu[i].show();
				results.push(i++);
			}
			return results;
		};

		return loadingView;

	}