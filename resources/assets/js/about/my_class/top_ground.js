export default function(superClass) {
		extend(topGround, superClass);

		function topGround(stageId) {
			this._mostDepthObject = bind(this._mostDepthObject, this);
			this.dispose = bind(this.dispose, this);
			this.update = bind(this.update, this);
			this.start = bind(this.start, this);
			topGround.__super__.constructor.call(this);
			this._stageId = stageId;
			this._groundSize = 0;
			this._stg = [];
			this._kumo = [];
			this._fusha = [];
		}

		topGround.prototype.start = function() {
			var fusha, i, kumo, num, obj, orgObj;
			topGround.__super__.start.call(this);
			orgObj = root.MY.gl.data.getStageObj3D(this._stageId, "stage");
			this._groundSize = this.depthFromBBox(orgObj.children[0].geometry.boundingBox);
			this._groundSize *= this._conf.GROUND_OFFSET.SCALE1;
			i = 0;
			num = 5;
			while (i < num) {
				obj = orgObj.clone();
				this._container.add(obj);
				if (i % 2 !== 0) {
					obj.scale.x = -1;
				} else {
					obj.scale.x = 1;
				}
				obj.position.y = this._conf.GROUND_OFFSET.Y;
				obj.position.z = -this._groundSize * 0.5 - this._groundSize * i;
				this._stg.push(obj);
				kumo = root.MY.gl.data.getCmnObj3D("cloud" + String(this._stageId)).clone();
				this._container.add(kumo);
				kumo.position.copy(obj.position);
				kumo.position.x = this._conf.CLOUD_POS.BASE_X + this._u.range(this._conf.CLOUD_POS.RANEGE_X);
				if (this._isSmt) {
					kumo.position.y = this._conf.CLOUD_POS.BASE_Y + 20 + this._u.range(this._conf.CLOUD_POS.RANEGE_Y);
				} else {
					kumo.position.y = this._conf.CLOUD_POS.BASE_Y + this._u.range(this._conf.CLOUD_POS.RANEGE_Y);
				}
				this._kumo.push(kumo);
				fusha = new root.MY_CLASS.fusha();
				fusha.start();
				this._container.add(fusha.container());
				fusha.show();
				fusha.container().position.z = obj.position.z;
				fusha.container().scale.x = obj.scale.x;
				this._fusha.push(fusha);
				i++;
			}
			this._container.scale.set(this._conf.GROUND_SCALE, this._conf.GROUND_SCALE, this._conf.GROUND_SCALE);
			return this.update();
		};

		topGround.prototype.update = function() {
			var i, j, k, len1, len2, len3, mostObj, n, ref, ref1, ref2, results, val;
			topGround.__super__.update.call(this);
			if (this._container.visible) {
				ref = this._kumo;
				for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
					val = ref[i];
					val.position.z += this._conf.TOP_MOVE_SPEED;
				}
				ref1 = this._fusha;
				for (i = k = 0, len2 = ref1.length; k < len2; i = ++k) {
					val = ref1[i];
					val.container().position.z += this._conf.TOP_MOVE_SPEED;
				}
				ref2 = this._stg;
				results = [];
				for (i = n = 0, len3 = ref2.length; n < len3; i = ++n) {
					val = ref2[i];
					val.position.z += this._conf.TOP_MOVE_SPEED;
					if (val.position.z > 100) {
						mostObj = this._mostDepthObject();
						val.position.z = mostObj.position.z - this._groundSize * 0.5 - this._groundSize * 0.5;
						this._kumo[i].position.z = val.position.z;
						this._fusha[i].container().position.z = val.position.z;
						if (mostObj.scale.x === 1) {
							val.scale.x = -1;
						} else {
							val.scale.x = 1;
						}
						results.push(this._fusha[i].container().scale.x = val.scale.x);
					} else {
						results.push(void 0);
					}
				}
				return results;
			}
		};

		topGround.prototype.dispose = function() {
			var i, j, k, len1, len2, len3, n, ref, ref1, ref2, val;
			if (this._kumo != null) {
				ref = this._kumo;
				for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
					val = ref[i];
					if (val != null) {
						this._container.remove(val);
					}
				}
				this._kumo = null;
			}
			if (this._stg != null) {
				ref1 = this._stg;
				for (i = k = 0, len2 = ref1.length; k < len2; i = ++k) {
					val = ref1[i];
					if (val != null) {
						this._container.remove(val);
					}
				}
				this._stg = null;
			}
			if (this._fusha != null) {
				ref2 = this._fusha;
				for (i = n = 0, len3 = ref2.length; n < len3; i = ++n) {
					val = ref2[i];
					if (val != null) {
						this._container.remove(val);
					}
				}
				this._fusha = null;
			}
			return topGround.__super__.dispose.call(this);
		};

		topGround.prototype._mostDepthObject = function() {
			var i, j, key, len1, ref, val, z;
			key = 0;
			z = this._stg[0].position.z;
			ref = this._stg;
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				if (val.position.z < z) {
					z = val.position.z;
					key = i;
				}
			}
			return this._stg[key];
		};

		return topGround;

	}