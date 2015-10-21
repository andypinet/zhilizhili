export default function(superClass) {
		extend(ring, superClass);

		function ring(id) {
			this.lifeUp = bind(this.lifeUp, this);
			this.hide = bind(this.hide, this);
			this.show = bind(this.show, this);
			this.dispose = bind(this.dispose, this);
			this.update = bind(this.update, this);
			this.start = bind(this.start, this);
			ring.__super__.constructor.call(this);
			this._id = id;
			this._color;
			this._colorParam = {};
			this._ang = this._id * (360 / this._conf.PRE_SET_RING_NUM);
			this._tgOpacity = 1;
			this._anm = new root._LIBS.animation();
			this._mesh;
		}

		ring.prototype.start = function() {
			var geometry, material;
			ring.__super__.start.call(this);
			this._color = new THREE.Color();
			this._colorParam.s = this._colorParam.defS = this._colorParam.ts = 0.65;
			this._colorParam.l = this._colorParam.defL = this._colorParam.tl = 0.6;
			geometry = new THREE.TorusGeometry(60, 2, 32, 32);
			material = new THREE.MeshBasicMaterial({
				color: 0xffffff,
				transparent: true,
				opacity: 0,
				blending: THREE.AdditiveBlending,
				depthTest: true
			});
			this._mesh = new THREE.Mesh(geometry, material);
			this._container.add(this._mesh);
			this._container.visible = false;
			return this.update();
		};

		ring.prototype.update = function() {
			var ease0, ease1, mat, opacity, scale;
			ring.__super__.update.call(this);
			if (this._container.visible) {
				this._container.rotation.x = this._camera.rotation.x;
				this._container.rotation.y = this._camera.rotation.y;
				ease0 = 0.1;
				ease1 = 0.3;
				this._colorParam.ts += (this._colorParam.defS - this._colorParam.ts) * ease0;
				this._colorParam.tl += (this._colorParam.defL - this._colorParam.tl) * ease0;
				this._colorParam.s += (this._colorParam.ts - this._colorParam.s) * ease1;
				this._colorParam.l += (this._colorParam.tl - this._colorParam.l) * ease1;
				this._ang += 2;
				this._color.setHSL(this._u.map(Math.sin(this._u.radian(this._ang)), 0, 1, -1, 1), this._colorParam.s, this._colorParam.l);
				opacity = this._u.map(this._camera.position.z - this._container.position.z, 1, 0, 200, 3000);
				opacity *= this._anm.get("opacity");
				mat = this._mesh.material;
				mat.setValues({
					color: this._color.getHex(),
					opacity: opacity
				});
				mat.needsUpdate = true;
				if (!this._anm.isCompleted()) {
					scale = this._anm.get("scale");
					return this._mesh.scale.set(scale, scale, scale);
				}
			}
		};

		ring.prototype.dispose = function() {
			if (this._mesh != null) {
				this._container.remove(this._mesh);
				this._mesh.geometry.dispose();
				this._mesh.material.dispose();
				this._mesh = null;
			}
			this._color = null;
			return ring.__super__.dispose.call(this);
		};

		ring.prototype.show = function(pos) {
			this._container.visible = true;
			this._container.position.copy(pos);
			this._anm.set({
				opacity: {
					from: 0,
					to: this._tgOpacity
				},
				scale: {
					from: 5,
					to: 1
				},
				frame: 50,
				delay: this._id * 10,
				ease: "easeInOutExpo"
			});
			this._anm.start();
			return this.update();
		};

		ring.prototype.hide = function() {
			this._container.visible = false;
			this._mesh.material.opacity = 0;
			return this._anm.reset();
		};

		ring.prototype.lifeUp = function() {
			this._colorParam.ts = 1;
			return this._colorParam.tl = 1;
		};

		return ring;

	}