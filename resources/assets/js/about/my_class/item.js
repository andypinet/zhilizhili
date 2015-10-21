export default function(superClass) {
		extend(item, superClass);

		function item(rank) {
			this.isHitTarget = bind(this.isHitTarget, this);
			this.isContainStage = bind(this.isContainStage, this);
			this.get3dObject = bind(this.get3dObject, this);
			this.rank = bind(this.rank, this);
			this._getItemRank = bind(this._getItemRank, this);
			this._makeHitEffectObject = bind(this._makeHitEffectObject, this);
			this._makeHitObject = bind(this._makeHitObject, this);
			this.hide = bind(this.hide, this);
			this.hitAnimation = bind(this.hitAnimation, this);
			this.isDead = bind(this.isDead, this);
			this.show = bind(this.show, this);
			this.dispose = bind(this.dispose, this);
			this._updateHit = bind(this._updateHit, this);
			this._updateShow = bind(this._updateShow, this);
			this.update = bind(this.update, this);
			this._makeShowEffectMesh = bind(this._makeShowEffectMesh, this);
			this.start = bind(this.start, this);
			item.__super__.constructor.call(this);
			this._rank = rank;
			this._cnt = 0;
			this._cntMax = 0;
			this._cntDead = 0;
			this._cntDeadMax = 0;
			this._obj;
			this._showLine;
			this._hit;
			this._prtcl;
			this._comboPrtcl;
			this._hitObject = [];
			this._hitEffectParam = [];
			this._hitParam = {};
			this._showParam = {};
			this._showEffect = [];
			this._scale = 5;
			this._isPlayingHitAnimation = false;
		}

		item.prototype.start = function() {
			var orgObj;
			item.__super__.start.call(this);
			orgObj = this._data.getCmnObj3D("item" + String(this._rank));
			this._obj = orgObj.clone();
			this._container.add(this._obj);
			this._makeShowEffectMesh();
			this._makeHitObject();
			this._container.visible = false;
			this._hitParam.anm = new root._LIBS.animation();
			this._hitEffectParam[0] = {
				anm: new root._LIBS.animation()
			};
			if (!this._isSmt) {
				this._hitEffectParam[1] = {
					anm: new root._LIBS.animation()
				};
			}
			this._makeHitEffectObject();
			this._prtcl = new root.MY_CLASS.hit();
			this._prtcl.start();
			this._container.add(this._prtcl.container());
			this._prtcl.setColor(this._conf.ITEM_COLOR[this._rank]);
			this._comboPrtcl = new root.MY_CLASS.prtclCombo();
			this._comboPrtcl.start();
			this._container.add(this._comboPrtcl.container());
			this._comboPrtcl.setColor(this._conf.ITEM_COLOR[this._rank]);
			this._showLine = new root.MY_CLASS.drawingLine(this._conf.ITEM_COLOR[this._rank], 20);
			this._showLine.start();
			this._container.add(this._showLine.container());
			return this._showParam.anm = new root._LIBS.animation();
		};

		item.prototype._makeShowEffectMesh = function() {
			var geometry, material, obj, radius;
			radius = 20;
			geometry = new THREE.CircleGeometry(radius, 32);
			material = new THREE.MeshBasicMaterial({
				color: this._conf.ITEM_COLOR[this._rank],
				transparent: true,
				opacity: 1,
				depthTest: false,
				blending: THREE.AdditiveBlending
			});
			obj = new THREE.Mesh(geometry, material);
			this._container.add(obj);
			obj.visible = false;
			this._showEffect[0] = obj;
			return this._showEffect[1] = new root._LIBS.animation();
		};

		item.prototype.update = function() {
			item.__super__.update.call(this);
			if (this._container.visible) {
				this._cnt++;
				if (this._isPlayingHitAnimation) {
					return this._updateHit();
				} else {
					return this._updateShow();
				}
			}
		};

		item.prototype._updateShow = function() {
			var anm, obj, s;
			if (!this._showParam.anm.isCompleted() || !this._showEffect[1].isCompleted()) {
				this._obj.rotation.x = this._showParam.anm.get("rx");
				this._obj.rotation.y = this._showParam.anm.get("ry");
				this._obj.rotation.z = this._showParam.anm.get("rz");
				s = this._showParam.anm.get("scale");
				this._obj.scale.set(s, s, s);
				anm = this._showEffect[1];
				if (!anm.isCompleted() && anm.isStart()) {
					obj = this._showEffect[0];
					obj.visible = true;
					s = anm.get("scale");
					obj.scale.set(s, s, s);
					if (anm.isCompleted()) {
						return obj.visible = false;
					}
				}
			}
		};

		item.prototype._updateHit = function() {
			var compCnt, i, j, len1, obj, ref, s, val;
			this._cntDead++;
			this._obj.rotation.x = this._hitParam.anm.get("rx");
			this._obj.rotation.y = this._hitParam.anm.get("ry");
			this._obj.rotation.z = this._hitParam.anm.get("rz");
			s = this._hitParam.anm.get("scale");
			this._obj.scale.set(s, s, s);
			compCnt = 0;
			ref = this._hitEffectParam;
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				obj = this._hitObject[i];
				s = val.anm.get("scale");
				obj.scale.set(s, s, s);
				obj.material.opacity = val.anm.get("opacity");
				obj.material.needsUpdate = true;
				if (val.anm.isCompleted()) {
					compCnt++;
				}
			}
			if (this._hitParam.anm.isCompleted() && compCnt >= this._hitEffectParam.length) {
				this._isPlayingHitAnimation = false;
				return this._container.visible = false;
			}
		};

		item.prototype.dispose = function() {
			if (this._obj != null) {
				this._container.remove(this._obj);
				this._obj = null;
			}
			if (this._hit != null) {
				this._container.remove(this._hit);
				this._hit.material.dispose();
				this._hit.geometry.dispose();
				this._hit = null;
			}
			return item.__super__.dispose.call(this);
		};

		item.prototype.show = function(pos, delay, interval) {
			var i, j, len1, lineHideDelay, onpuShowDelay, ref, val;
			delay *= interval || 13;
			this._container.visible = true;
			this._hit.visible = true;
			ref = this._hitObject;
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				val.visible = false;
			}
			this._obj.rotation.x = 0;
			this._obj.rotation.y = 0;
			this._obj.rotation.z = this._u.radian(90 + this._u.range(30));
			this._obj.scale.set(0.001, 0.001, 0.001);
			this._container.position.copy(pos);
			this._obj.visible = true;
			this._isPlayingHitAnimation = false;
			this._hitParam.anm.reset();
			lineHideDelay = delay + 40;
			onpuShowDelay = lineHideDelay + 20;
			this._showParam.anm.set({
				rx: {
					from: this._obj.rotation.x,
					to: this._u.radian(this._u.range(0))
				},
				ry: {
					from: this._obj.rotation.y,
					to: this._u.radian(this._u.range(0))
				},
				rz: {
					from: this._obj.rotation.z,
					to: this._u.radian(90)
				},
				scale: {
					from: 0.01,
					to: this._scale
				},
				frame: 30,
				delay: onpuShowDelay,
				ease: "bounceOut"
			});
			this._showParam.anm.start();
			this._showEffect[1].set({
				scale: {
					from: [3.5, 2][this._device],
					to: [0.01, 0.01][this._device]
				},
				opacity: {
					from: 1,
					to: 0
				},
				frame: [30, 40][this._device],
				delay: [onpuShowDelay - 5, onpuShowDelay - 5][this._device],
				ease: "easeOutExpo"
			});
			this._showEffect[1].start();
			this._showEffect[0].visible = false;
			this._showLine.show(70, delay, 40, lineHideDelay);
			this._prtcl.hide();
			this._comboPrtcl.hide();
			this._cnt = 0;
			return this._cntMax = [onpuShowDelay + 5, onpuShowDelay - 10][this._device];
		};

		item.prototype.isDead = function() {
			if (!this._container.visible || (this._isPlayingHitAnimation && this._cntDead >= this._cntDeadMax)) {
				return true;
			} else {
				return false;
			}
		};

		item.prototype.hitAnimation = function(combo) {
			var color, delay, ease, frame, i, j, len1, obj, op0, op1, ref, s0, s1, val;
			if (this._isPlayingHitAnimation) {
				return;
			}
			this._isPlayingHitAnimation = true;
			this._cntDead = 0;
			this._cntDeadMax = 30;
			this._hitParam.anm.set({
				rx: {
					from: this._obj.rotation.x,
					to: this._obj.rotation.x + this._u.radian(this._u.range(80))
				},
				ry: {
					from: this._obj.rotation.y,
					to: this._obj.rotation.y + this._u.radian(this._u.range(80))
				},
				rz: {
					from: this._obj.rotation.z,
					to: this._obj.rotation.z + this._u.radian(330)
				},
				scale: {
					from: this._scale,
					to: 0.0001
				},
				frame: [30, 15][this._device],
				ease: "easeInOutExpo"
			});
			this._hitParam.anm.start();
			color = this._conf.ITEM_COLOR[this._rank];
			ref = this._hitEffectParam;
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				switch (i) {
					case 0:
						if (!this._isSmt) {
							s0 = [9, 16, 30][~~((combo - 1) / 3)];
						} else {
							s0 = [8, 16, 16][~~((combo - 1) / 3)];
						}
						s1 = 0.001;
						op0 = 1;
						op1 = op0;
						frame = 50;
						delay = [1, 0][this._device];
						ease = "easeOutExpo";
						break;
					case 1:
						s0 = 0.1;
						s1 = this._u.map(combo, 5, 20, 1, 7);
						op0 = 1;
						op1 = 0;
						frame = 80;
						delay = 0;
						ease = "easeOutExpo";
						break;
					case 2:
						s0 = 1;
						s1 = this._u.map(combo, 2, 6, 1, 7);
						op0 = 1;
						op1 = 0;
						frame = 30;
						delay = 0;
						ease = "easeInExpo";
				}
				val.anm.set({
					scale: {
						from: s0,
						to: s1
					},
					opacity: {
						from: op0,
						to: op1
					},
					frame: frame,
					delay: delay,
					ease: ease
				});
				val.anm.start();
				obj = this._hitObject[i];
				obj.material.setValues({
					color: color,
					opacity: op0
				});
				obj.material.needsUpdate = true;
				obj.visible = true;
			}
			this._showEffect[0].visible = false;
			this._showLine.hide();
			this._hit.visible = false;
			this.update();
			this._prtcl.show(combo);
			if (combo >= 3 && !this._isSmt) {
				return this._comboPrtcl.show(combo);
			}
		};

		item.prototype.hide = function() {
			item.__super__.hide.call(this);
			this._showEffect[0].visible = false;
			this._showLine.hide();
			this._hit.visible = false;
			this._isPlayingHitAnimation = false;
			this._prtcl.hide();
			return this._comboPrtcl.hide();
		};

		item.prototype._makeHitObject = function() {
			var geometry, material, size;
			size = [80, 80][this._device];
			geometry = new THREE.PlaneBufferGeometry(size, size);
			material = new THREE.MeshBasicMaterial({
				color: 0xff0000,
				transparent: true,
				opacity: 0,
				blending: THREE.NormalBlending,
				depthTest: false
			});
			this._hit = new THREE.Mesh(geometry, material);
			return this._container.add(this._hit);
		};

		item.prototype._makeHitEffectObject = function() {
			var geometry, i, material, num, obj, radius, results;
			i = 0;
			num = this._hitEffectParam.length;
			results = [];
			while (i < num) {
				switch (i) {
					case 0:
						radius = [5, 2.5][this._device];
						geometry = new THREE.CircleGeometry(radius, 32);
						material = new THREE.MeshBasicMaterial({
							color: 0xffffff,
							transparent: true,
							opacity: 0,
							depthTest: false,
							blending: THREE.CustomBlending,
							blendSrc: THREE[this._conf.BLEND[7]],
							blendDst: THREE[this._conf.BLEND[1]],
							blendEquation: THREE.AddEquation
						});
						obj = new THREE.Mesh(geometry, material);
						this._container.add(obj);
						this._hitObject.push(obj);
						break;
					case 1:
						geometry = new THREE.TorusGeometry(6, 0.05, 32, 32);
						material = new THREE.MeshBasicMaterial({
							color: 0xffffff,
							transparent: true,
							opacity: 0,
							depthTest: false,
							blending: THREE.AdditiveBlending
						});
						obj = new THREE.Mesh(geometry, material);
						this._container.add(obj);
						this._hitObject.push(obj);
						break;
					case 2:
						geometry = new THREE.TorusGeometry(6, 1, 32, 32);
						material = new THREE.MeshBasicMaterial({
							color: 0xffffff,
							transparent: true,
							opacity: 0,
							blending: THREE.NormalBlending,
							depthTest: false
						});
						obj = new THREE.Mesh(geometry, material);
						this._container.add(obj);
						this._hitObject.push(obj);
				}
				results.push(i++);
			}
			return results;
		};

		item.prototype._getItemRank = function() {
			if (this._u.hit(15)) {
				return 2;
			} else {
				if (this._u.hit(3)) {
					return 1;
				} else {
					return 0;
				}
			}
		};

		item.prototype.rank = function() {
			return this._rank;
		};

		item.prototype.get3dObject = function() {
			return this._hit;
		};

		item.prototype.isContainStage = function() {
			var frustum;
			if (this.isDead()) {
				return false;
			}
			if (this._isPlayingHitAnimation) {
				return true;
			} else {
				frustum = new THREE.Frustum();
				frustum.setFromMatrix(new THREE.Matrix4().multiplyMatrices(this._camera.projectionMatrix, this._camera.matrixWorldInverse));
				return this._container.visible && frustum.containsPoint(this._container.position);
			}
		};

		item.prototype.isHitTarget = function() {
			return this.isContainStage() && !this._isPlayingHitAnimation && this._cnt >= this._cntMax;
		};

		return item;

	}