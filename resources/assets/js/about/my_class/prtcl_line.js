export default function(superClass) {
		extend(prtclLine, superClass);

		function prtclLine() {
			this._getPosList = bind(this._getPosList, this);
			this.setColor = bind(this.setColor, this);
			this.show = bind(this.show, this);
			this._makePrtcl = bind(this._makePrtcl, this);
			this.dispose = bind(this.dispose, this);
			this._updatePrtcl = bind(this._updatePrtcl, this);
			this.update = bind(this.update, this);
			this.start = bind(this.start, this);
			prtclLine.__super__.constructor.call(this, {
				addScene: false
			});
			this._prtcl = [];
		}

		prtclLine.prototype.start = function() {
			prtclLine.__super__.start.call(this);
			return this._makePrtcl();
		};

		prtclLine.prototype.update = function() {
			prtclLine.__super__.update.call(this);
			if (this._container.visible) {
				return this._updatePrtcl();
			}
		};

		prtclLine.prototype._updatePrtcl = function() {
			var anm, anmLineNum, deadCnt, ease, i, j, len1, mesh, ref, val;
			anmLineNum = 0;
			deadCnt = 0;
			ref = this._prtcl;
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				mesh = val.mesh;
				anm = val.anm;
				if (anm.isShow && ++anm.i >= anm.d) {
					anmLineNum++;
					mesh.visible = true;
					mesh.position.x += anm.g;
					mesh.material.needsUpdate = true;
					mesh.rotation.x += anm.rotXSpd;
					mesh.rotation.y += anm.rotYSpd;
					mesh.rotation.z += anm.rotZSpd;
					if (anm.i >= anm.d + anm.dead) {
						ease = 0.05;
						if (anm.i >= anm.d + anm.dead + anm.dead2) {
							mesh.visible = false;
							deadCnt++;
						}
					}
				}
			}
			if (deadCnt >= anmLineNum) {
				return this._container.visible = false;
			}
		};

		prtclLine.prototype.dispose = function() {
			return prtclLine.__super__.dispose.call(this);
		};

		prtclLine.prototype._makePrtcl = function() {
			var anm, b, geometry, i, material, num, obj, results, size, tri;
			i = 0;
			num = [20, 16][this._device];
			results = [];
			while (i < num) {
				obj = {};
				size = 1.5;
				geometry = new THREE.Geometry();
				geometry.vertices[0] = new THREE.Vector3(-size * 0.5, size * 0.5, 0);
				geometry.vertices[1] = new THREE.Vector3(size * 0.5, size * 0.5, 0);
				geometry.vertices[2] = new THREE.Vector3(0, -size * 0.5, 0);
				geometry.faces[0] = new THREE.Face3(0, 1, 2);
				b = THREE.AdditiveBlending;
				material = new THREE.MeshBasicMaterial({
					color: 0xff0000,
					transparent: true,
					opacity: 1,
					side: THREE.DoubleSide,
					blending: b
				});
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

		prtclLine.prototype.show = function(to, from, c0, c1) {
			var anm, color, i, j, len1, mesh, p, pos, ref, scale, val;
			pos = this._getPosList(to, from, c0, c1);
			color = new THREE.Color();
			ref = this._prtcl;
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				mesh = val.mesh;
				anm = val.anm;
				if (pos[i] != null) {
					p = pos[i];
					mesh.visible = false;
					anm.isShow = true;
					color.setRGB(p.r, p.g, p.b);
					mesh.material.setValues({
						color: color.getHex(),
						opacity: 1
					});
					mesh.material.needsUpdate = true;
					if (this._u.hit(4)) {
						scale = this._u.random(1, 10) / 100;
					} else {
						scale = this._u.random(50, 100) / 100;
					}
					mesh.scale.set(scale, scale, scale);
					mesh.rotation.x = this._u.radian(this._u.range(180));
					mesh.rotation.y = this._u.radian(this._u.range(180));
					mesh.rotation.z = this._u.radian(this._u.range(180));
					anm.x = p.x;
					anm.y = p.y;
					anm.z = p.z;
					anm.g = this._u.range(100) / 5000;
					anm.d = i * 0.1;
					anm.i = 0;
					anm.dead = this._conf.LINE_HIDE_INTERVAL[this._device];
					anm.dead2 = 20;
					anm.rotXSpd = this._u.range(100) / 100;
					anm.rotYSpd = this._u.range(100) / 100;
					anm.rotZSpd = this._u.range(100) / 100;
					mesh.position.set(anm.x, anm.y, anm.z);
				} else {
					mesh.visible = false;
					anm.isShow = false;
				}
			}
			return prtclLine.__super__.show.call(this);
		};

		prtclLine.prototype.setColor = function(color) {
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

		prtclLine.prototype._getPosList = function(to, from, c0, c1) {
			var anm, d, dx, dy, dz, f, fromColor, i, p, pos, toColor;
			pos = [];
			fromColor = new THREE.Color(c1);
			toColor = new THREE.Color(c0);
			dx = from.x - to.x;
			dy = from.y - to.y;
			dz = from.z - to.z;
			d = Math.sqrt(dx * dx + dy * dy + dz * dz);
			f = this._u.map(d, 0, this._prtcl.length, 0, 300);
			anm = new root._LIBS.animation();
			anm.set({
				x: {
					from: from.x,
					to: to.x
				},
				y: {
					from: from.y,
					to: to.y
				},
				z: {
					from: from.z,
					to: to.z
				},
				r: {
					from: fromColor.r,
					to: toColor.r
				},
				g: {
					from: fromColor.g,
					to: toColor.g
				},
				b: {
					from: fromColor.b,
					to: toColor.b
				},
				frame: f,
				ease: "linear"
			});
			i = 0;
			while (i < f) {
				anm.rate(i / f);
				p = {
					x: anm.get("x"),
					y: anm.get("y"),
					z: anm.get("z"),
					r: anm.get("r"),
					g: anm.get("g"),
					b: anm.get("b")
				};
				pos.push(p);
				i++;
			}
			return pos;
		};

		return prtclLine;

	}