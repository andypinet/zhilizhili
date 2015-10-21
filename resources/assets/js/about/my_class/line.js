export default function(superClass) {
		extend(line, superClass);

		function line() {
			this._resetCombo = bind(this._resetCombo, this);
			this._addLine = bind(this._addLine, this);
			this.addPoint = bind(this.addPoint, this);
			this.getCombo = bind(this.getCombo, this);
			this.reset = bind(this.reset, this);
			this.dispose = bind(this.dispose, this);
			this._updateLine = bind(this._updateLine, this);
			this._updatePoint = bind(this._updatePoint, this);
			this.update = bind(this.update, this);
			this._getUseLine2 = bind(this._getUseLine2, this);
			this._getUseLine = bind(this._getUseLine, this);
			this._makeLine2 = bind(this._makeLine2, this);
			this._makeLine = bind(this._makeLine, this);
			this.start = bind(this.start, this);
			line.__super__.constructor.call(this);
			this._points = [];
			this._comboPt = [];
			this._preLines = [];
			this._preLines2 = [];
			this._lines = [];
			this._combo = 0;
			this.onCompleteMaxCombo;
			this._cnt = 0;
		}

		line.prototype.start = function() {
			line.__super__.start.call(this);
			this._resetCombo();
			this._makeLine();
			return this._makeLine2();
		};

		line.prototype._makeLine = function() {
			var i, line, num, results;
			i = 0;
			num = this._conf.PRE_SET_LINE_NUM;
			results = [];
			while (i < num) {
				line = new root.MY_CLASS.prtclLine();
				line.start();
				this._container.add(line.container());
				this._preLines.push(line);
				results.push(i++);
			}
			return results;
		};

		line.prototype._makeLine2 = function() {
			var geo, i, line, mat, num, results;
			i = 0;
			num = this._conf.PRE_SET_LINE_NUM;
			results = [];
			while (i < num) {
				geo = new THREE.Geometry();
				mat = new THREE.LineBasicMaterial({
					color: 0xFFFFFF,
					vertexColors: true,
					transparent: true,
					opacity: 1,
					blending: THREE.AdditiveBlending,
					depthTest: false,
					linewidth: this._isSmt ? this._conf.LINE_WEIGHT_SMT : this._conf.LINE_WEIGHT_PC
				});
				line = new THREE.Line(geo, mat);
				line.visible = false;
				this._container.add(line);
				this._preLines2.push(line);
				results.push(i++);
			}
			return results;
		};

		line.prototype._getUseLine = function() {
			var i, j, len1, ref, val;
			ref = this._preLines;
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				if (!val.container().visible) {
					return val;
				}
			}
			return null;
		};

		line.prototype._getUseLine2 = function() {
			var i, j, len1, ref, val;
			ref = this._preLines2;
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				if (!val.visible) {
					return val;
				}
			}
			return null;
		};

		line.prototype.update = function() {
			line.__super__.update.call(this);
			this._updatePoint();
			return this._updateLine();
		};

		line.prototype._updatePoint = function() {
			var i, j, len1, ref, results, val;
			ref = this._points;
			results = [];
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				if (val != null) {
					val[2]--;
					if (val[2] <= 0) {
						results.push(this._points[i] = null);
					} else {
						results.push(void 0);
					}
				} else {
					results.push(void 0);
				}
			}
			return results;
		};

		line.prototype._updateLine = function() {
			var i, j, len1, m, ref, results, val;
			ref = this._lines;
			results = [];
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				if (val != null) {
					val.geometry.colorsNeedUpdate = true;
					val.geometry.verticesNeedUpdate = true;
					val.fadeOutDelay--;
					if (val.fadeOutDelay < 0) {
						if (this._isSmt) {
							val.visible = false;
							results.push(this._lines[i] = null);
						} else {
							m = val.material;
							m.opacity += (0 - m.opacity) * 0.1;
							if (Math.abs(0 - m.opacity) < 0.05) {
								val.visible = false;
								results.push(this._lines[i] = null);
							} else {
								results.push(void 0);
							}
						}
					} else {
						results.push(void 0);
					}
				} else {
					results.push(void 0);
				}
			}
			return results;
		};

		line.prototype.dispose = function() {
			return line.__super__.dispose.call(this);
		};

		line.prototype.reset = function() {
			this._lines = [];
			return this._points = [];
		};

		line.prototype.getCombo = function() {
			return this._combo;
		};

		line.prototype.addPoint = function(vec3, rank) {
			this._points = this._u.sliceNull(this._points);
			this._points.push([vec3, this._conf.ITEM_COLOR[rank], this._parameter.get("lineLife")]);
			if (this._points.length >= 2) {
				this._addLine(this._points[this._points.length - 2], this._points[this._points.length - 1]);
				this._cnt++;
				this._combo++;
				this._comboPt.push(vec3.clone());
				if (this._combo >= this._conf.MAX_COMBO) {
					if (this.onCompleteMaxCombo != null) {
						this.onCompleteMaxCombo(this._comboPt);
					}
					this._resetCombo();
					return this._comboPt.push(vec3.clone());
				}
			} else {
				this._resetCombo();
				return this._comboPt.push(vec3.clone());
			}
		};

		line.prototype._addLine = function(pA, pB) {
			var geo, line, line2;
			line = this._getUseLine();
			line.show(pB[0], pA[0], pB[1], pA[1]);
			line2 = this._getUseLine2();
			if (line2 == null) {
				return;
			}
			geo = line2.geometry;
			geo.vertices[0] = pA[0];
			geo.vertices[1] = pB[0];
			geo.colors[0] = new THREE.Color(pA[1]);
			geo.colors[1] = new THREE.Color(pB[1]);
			geo.computeBoundingSphere();
			line2.material.opacity = 0.5;
			line2.fadeOutDelay = this._conf.LINE_HIDE_INTERVAL[this._device];
			line2.visible = true;
			this._lines.push(line2);
			return this._lines = this._u.sliceNull(this._lines);
		};

		line.prototype._resetCombo = function() {
			this._combo = 1;
			return this._comboPt = [];
		};

		return line;

	}