export default function(superClass) {
		extend(hit, superClass);

		function hit() {
			this.setColor = bind(this.setColor, this);
			this.show = bind(this.show, this);
			this._makePrtcl = bind(this._makePrtcl, this);
			this.dispose = bind(this.dispose, this);
			this._updatePrtcl = bind(this._updatePrtcl, this);
			this.update = bind(this.update, this);
			this.start = bind(this.start, this);
			hit.__super__.constructor.call(this, {
				addScene: false
			});
			this._prtcl = [];
		}

		hit.prototype.start = function() {
			hit.__super__.start.call(this);
			return this._makePrtcl();
		};

		hit.prototype.update = function() {
			hit.__super__.update.call(this);
			if (this._container.visible) {
				return this._updatePrtcl();
			}
		};

		hit.prototype._updatePrtcl = function() {
			var anm, deadCnt, ease, i, j, len1, mesh, ref, tx, ty, tz, val;
			deadCnt = 0;
			ref = this._prtcl;
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				mesh = val.mesh;
				anm = val.anm;
				if (++anm.i >= anm.d) {
					mesh.visible = true;
					anm.p = Math.min(1, anm.p += 0.05);
					tx = anm.tx0 * (1 - anm.p) + anm.tx1 * anm.p;
					ty = anm.ty0 * (1 - anm.p) + anm.ty1 * anm.p;
					tz = anm.tz0 * (1 - anm.p) + anm.tz1 * anm.p;
					ease = 0.1;
					mesh.position.x += (tx - mesh.position.x) * ease;
					mesh.position.y += (ty - mesh.position.y) * ease;
					mesh.position.z += (tz - mesh.position.z) * ease;
					if (anm.i >= anm.dead + anm.d) {
						mesh.visible = false;
						deadCnt++;
					}
				}
			}
			if (deadCnt >= this._prtcl.length) {
				return this._container.visible = false;
			}
		};

		hit.prototype.dispose = function() {
			return hit.__super__.dispose.call(this);
		};

		hit.prototype._makePrtcl = function() {
			var anm, geometry, i, material, num, obj, results, size, tri;
			i = 0;
			num = [12, 5][this._device];
			results = [];
			while (i < num) {
				obj = {};
				size = 12;
				geometry = new THREE.Geometry();
				geometry.vertices[0] = new THREE.Vector3(-size * 0.5, size * 0.5, 0);
				geometry.vertices[1] = new THREE.Vector3(size * 0.5, size * 0.5, 0);
				geometry.vertices[2] = new THREE.Vector3(0, -size * 0.5, 0);
				geometry.faces[0] = new THREE.Face3(0, 1, 2);
				if (this._u.hit(4)) {
					material = new THREE.MeshBasicMaterial({
						color: 0x00ff,
						side: THREE.DoubleSide
					});
				} else {
					material = new THREE.MeshBasicMaterial({
						color: 0x00ff,
						transparent: true,
						opacity: 1,
						side: THREE.DoubleSide,
						blending: THREE.AdditiveBlending
					});
				}
				tri = new THREE.Mesh(geometry, material);
				this._container.add(tri);
				tri.visible = false;
				obj.mesh = tri;
				anm = {};
				obj.anm = anm;
				this._prtcl.push(obj);
				results.push(i++);
			}
			return results;
		};

		hit.prototype.show = function(combo) {
			var anm, i, j, len1, mesh, r, radius, ref, scale, start, val;
			radius = 60 + 2 * combo;
			start = this._u.random(0, 360);
			ref = this._prtcl;
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				mesh = val.mesh;
				anm = val.anm;
				mesh.visible = false;
				mesh.material.opacity = 1;
				mesh.material.needsUpdate = true;
				mesh.rotation.z = this._u.radian(this._u.range(180));
				if (this._u.hit(5)) {
					scale = this._u.random(1, 10) / 100;
					anm.rotSpdX = this._u.range(10) / 100;
					anm.rotSpdY = this._u.range(10) / 100;
					anm.rotSpdZ = this._u.range(10) / 100;
				} else {
					scale = this._u.random(30, 100) / 100;
					anm.rotSpdX = this._u.range(10) / 10000;
					anm.rotSpdY = this._u.range(10) / 10000;
					anm.rotSpdZ = this._u.range(10) / 10000;
				}
				mesh.scale.set(scale, scale, scale);
				anm.x = 0;
				anm.y = 0;
				anm.z = 0;
				anm.p = 0;
				r = this._u.range(combo * 7);
				anm.tx0 = Math.cos(this._u.radian(start + 360 / this._prtcl.length * (i + r))) * radius * 0.5;
				anm.ty0 = Math.sin(this._u.radian(start + 360 / this._prtcl.length * (i + r))) * radius * 0.5;
				anm.tz0 = Math.cos(this._u.radian(start + 360 / this._prtcl.length * (i + r))) * radius * 0.5;
				anm.tx1 = -this._u.random(40, 100);
				anm.ty1 = Math.sin(this._u.radian(start + 360 / this._prtcl.length * i)) * radius;
				anm.tz1 = Math.cos(this._u.radian(start + 360 / this._prtcl.length * i)) * radius;
				anm.d = i * 2;
				anm.i = 0;
				anm.dead = 20;
				mesh.position.set(anm.x, anm.y, anm.z);
			}
			return hit.__super__.show.call(this);
		};

		hit.prototype.setColor = function(color) {
			var i, j, len1, mesh, ref, results, val;
			ref = this._prtcl;
			results = [];
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				mesh = val.mesh;
				mesh.material.setValues({
					color: color
				});
				results.push(mesh.material.needsUpdate = true);
			}
			return results;
		};

		return hit;

	}