export default function(superClass) {
		extend(drawingLine, superClass);

		function drawingLine(color, radius) {
			this.show = bind(this.show, this);
			this._makeLine = bind(this._makeLine, this);
			this.dispose = bind(this.dispose, this);
			this._updateLine = bind(this._updateLine, this);
			this.update = bind(this.update, this);
			this.start = bind(this.start, this);
			drawingLine.__super__.constructor.call(this, {
				addScene: false
			});
			this._color = color;
			this._radius = radius;
			this._line;
			this._anm = {};
			this._v = [];
			this._vNum = 120;
			this._rotSpeed = {};
		}

		drawingLine.prototype.start = function() {
			drawingLine.__super__.start.call(this);
			this._anm.show = new root._LIBS.animation();
			this._anm.hide = new root._LIBS.animation();
			return this._makeLine();
		};

		drawingLine.prototype.update = function() {
			var s;
			drawingLine.__super__.update.call(this);
			if (this._container.visible) {
				this._updateLine();
				s = this._anm.hide.get("scale");
				this._container.scale.set(s, s, s);
				if (this._anm.hide.isCompleted()) {
					this._container.visible = false;
				}
				this._container.rotation.x += this._rotSpeed.x;
				this._container.rotation.y += this._rotSpeed.y;
				return this._container.rotation.z += this._rotSpeed.z;
			}
		};

		drawingLine.prototype._updateLine = function() {
			var geometry, i, j, key, len1, ref, val;
			if (!this._anm.show.isCompleted()) {
				key = ~~(this._anm.show.get("key"));
				if (this._v.length - key < 6) {
					key = this._v.length - 1;
				}
				geometry = this._line.geometry;
				ref = this._v;
				for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
					val = ref[i];
					geometry.vertices[i].x = this._v[Math.min(i, key)].x;
					geometry.vertices[i].y = this._v[Math.min(i, key)].y;
				}
				geometry.computeBoundingSphere();
				return geometry.verticesNeedUpdate = true;
			}
		};

		drawingLine.prototype.dispose = function() {
			return drawingLine.__super__.dispose.call(this);
		};

		drawingLine.prototype._makeLine = function() {
			var ang, geometry, i, j, len1, lineWidth, material, ref, s, val;
			i = 0;
			s = this._u.range(180);
			while (i < this._vNum) {
				ang = s + i * (360 / this._vNum);
				this._v.push(new THREE.Vector3(Math.sin(this._u.radian(ang)) * this._radius, Math.cos(this._u.radian(ang)) * this._radius, 0));
				i++;
			}
			this._v.push(this._v[0].clone());
			geometry = new THREE.Geometry();
			geometry.dynamic = true;
			ref = this._v;
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				geometry.vertices.push(val.clone());
			}
			lineWidth = [1, 0.5][this._device];
			material = new THREE.LineBasicMaterial({
				color: this._color,
				vertexColors: false,
				transparent: true,
				opacity: [1, 1][this._device],
				linewidth: lineWidth,
				blending: THREE.AdditiveBlending
			});
			this._line = new THREE.Line(geometry, material);
			return this._container.add(this._line);
		};

		drawingLine.prototype.show = function(f, d, f2, d2) {
			var i, j, len1, ref, val;
			this._anm.show.set({
				key: {
					from: 0,
					to: this._v.length - 1
				},
				frame: f,
				delay: d || 0,
				ease: "easeInOutExpo"
			});
			this._anm.show.start();
			ref = this._line.geometry.vertices;
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				val = this._v[0].clone();
			}
			this._rotSpeed.x = this._u.range(10) / 1000;
			this._rotSpeed.y = this._u.range(10) / 1000;
			this._rotSpeed.z = this._u.range(10) / 1000;
			this._container.rotation.set(0, 0, 0);
			this._anm.hide.set({
				scale: {
					from: [4, 2][this._device],
					to: 0.001
				},
				frame: f2,
				delay: d2,
				ease: "easeInOutExpo"
			});
			this._anm.hide.start();
			drawingLine.__super__.show.call(this);
			return this.update();
		};

		return drawingLine;

	}