export default function(superClass) {
		extend(comboMax, superClass);

		function comboMax() {
			this._setDot = bind(this._setDot, this);
			this._setLine = bind(this._setLine, this);
			this.show = bind(this.show, this);
			this.reset = bind(this.reset, this);
			this.dispose = bind(this.dispose, this);
			this._updateDot = bind(this._updateDot, this);
			this._updateLine = bind(this._updateLine, this);
			this.update = bind(this.update, this);
			this._makeDot = bind(this._makeDot, this);
			this._makeLine = bind(this._makeLine, this);
			this.start = bind(this.start, this);
			comboMax.__super__.constructor.call(this);
			this._line = [];
			this._lineAnm = [];
			this._dot = [];
			this._dotAnm = [];
			this._startDelay = 10;
			this._startDelayInterval = 6;
			this._isLineShowed = true;
			this._isDotShowed = true;
		}

		comboMax.prototype.start = function() {
			comboMax.__super__.start.call(this);
			this._makeLine();
			return this._makeDot();
		};

		comboMax.prototype._makeLine = function() {
			var anm, geometry, i, line, material, num, results;
			i = 0;
			num = this._conf.MAX_COMBO;
			results = [];
			while (i < num) {
				geometry = new THREE.TorusGeometry(6, 0.5, 32, 32);
				material = new THREE.MeshBasicMaterial({
					color: this._conf.RAINBOW_COLOR[i],
					transparent: true,
					opacity: 0,
					depthTest: false,
					blending: THREE.CustomBlending,
					blendSrc: THREE[this._conf.BLEND[4]],
					blendDst: THREE[this._conf.BLEND[3]],
					blendEquation: THREE.AddEquation
				});
				line = new THREE.Mesh(geometry, material);
				line.visible = false;
				this._container.add(line);
				this._line.push(line);
				anm = new root._LIBS.animation();
				this._lineAnm.push(anm);
				results.push(i++);
			}
			return results;
		};

		comboMax.prototype._makeDot = function() {
			var anm, geometry, i, material, num, obj, results;
			i = 0;
			num = this._conf.MAX_COMBO;
			results = [];
			while (i < num) {
				geometry = new THREE.CircleGeometry(20, 32);
				material = new THREE.MeshBasicMaterial({
					color: this._conf.RAINBOW_COLOR[i],
					transparent: true,
					opacity: 1,
					blending: THREE.NormalBlending,
					depthTest: false
				});
				obj = new THREE.Mesh(geometry, material);
				this._container.add(obj);
				obj.visible = false;
				this._dot.push(obj);
				anm = new root._LIBS.animation();
				this._dotAnm.push(anm);
				results.push(i++);
			}
			return results;
		};

		comboMax.prototype.update = function() {
			comboMax.__super__.update.call(this);
			if (!this._isLineShowed || !this._isDotShowed) {
				this._updateLine();
				if (this._isLineShowed && this._isDotShowed) {
					return this.reset();
				}
			}
		};

		comboMax.prototype._updateLine = function() {
			var anm, i, j, len1, lineDeadCnt, ref, scale, val;
			lineDeadCnt = 0;
			ref = this._line;
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				anm = this._lineAnm[i];
				if (anm.isStart()) {
					val.visible = true;
					scale = anm.get("scale");
					val.scale.set(scale, scale, scale);
					val.material.opacity = anm.get("opacity");
					if (anm.isCompleted()) {
						lineDeadCnt++;
						val.visible = false;
					}
				}
			}
			if (lineDeadCnt >= this._line.length) {
				return this._isLineShowed = true;
			}
		};

		comboMax.prototype._updateDot = function() {
			var anm, dotDeadCnt, i, j, len1, ref, scale, val;
			dotDeadCnt = 0;
			ref = this._dot;
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				anm = this._dotAnm[i];
				if (anm.isStart()) {
					val.visible = true;
					scale = anm.get("scale");
					val.scale.set(scale, scale, scale);
					val.material.opacity = anm.get("opacity");
					if (anm.isCompleted()) {
						dotDeadCnt++;
						val.visible = false;
					}
				}
			}
			if (dotDeadCnt >= this._dot.length) {
				return this._isDotShowed = true;
			}
		};

		comboMax.prototype.dispose = function() {
			return comboMax.__super__.dispose.call(this);
		};

		comboMax.prototype.reset = function() {
			this._isLineShowed = true;
			return this._isDotShowed = true;
		};

		comboMax.prototype.show = function(point) {
			comboMax.__super__.show.call(this);
			if (!this._isSmt) {
				root.MY.gl.main.startBrightAnimation([40, 20][this._device], 0, "easeInExpo", 0.2);
			}
			this.reset();
			this._isLineShowed = false;
			return this._setLine(point);
		};

		comboMax.prototype._setLine = function(point) {
			var anm, i, j, len1, ref, results, val;
			ref = this._line;
			results = [];
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				val.position.copy(point[i]);
				val.visible = false;
				anm = this._lineAnm[i];
				anm.set({
					scale: {
						from: [15, 15][this._device],
						to: 0.01
					},
					opacity: {
						from: 1,
						to: 1
					},
					frame: [60, 30][this._device],
					delay: this._startDelay + this._startDelayInterval * i,
					ease: "easeOutExpo"
				});
				results.push(anm.start());
			}
			return results;
		};

		comboMax.prototype._setDot = function(point) {
			var anm, i, j, len1, ref, results, val;
			ref = this._dot;
			results = [];
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				val.position.copy(point[i]);
				val.visible = false;
				anm = this._dotAnm[i];
				anm.set({
					scale: {
						from: 0.1,
						to: 6
					},
					opacity: {
						from: 1,
						to: 1
					},
					frame: 40,
					delay: this._startDelay + i * this._startDelayInterval,
					ease: "easeOutExpo"
				});
				results.push(anm.start());
			}
			return results;
		};

		return comboMax;

	}