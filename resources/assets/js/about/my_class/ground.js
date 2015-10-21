export default function(superClass) {
		extend(ground, superClass);

		function ground(roadSize) {
			this.openDoor = bind(this.openDoor, this);
			this._updateVertices = bind(this._updateVertices, this);
			this._addVerticesAnimation = bind(this._addVerticesAnimation, this);
			this.hide = bind(this.hide, this);
			this.show = bind(this.show, this);
			this._setStageObjects = bind(this._setStageObjects, this);
			this.upAreaSize = bind(this.upAreaSize, this);
			this.downAreaSize = bind(this.downAreaSize, this);
			this.minGameAreaSize = bind(this.minGameAreaSize, this);
			this.gameAreaEndZ = bind(this.gameAreaEndZ, this);
			this.gameAreaSize = bind(this.gameAreaSize, this);
			this.totalSize = bind(this.totalSize, this);
			this.loopGroundZ = bind(this.loopGroundZ, this);
			this.loopGroundStartZ = bind(this.loopGroundStartZ, this);
			this.loopStartZ = bind(this.loopStartZ, this);
			this.loopZ = bind(this.loopZ, this);
			this._addLoopGround = bind(this._addLoopGround, this);
			this._loopOffsetScale = bind(this._loopOffsetScale, this);
			this._addUpArea = bind(this._addUpArea, this);
			this._addDownArea2 = bind(this._addDownArea2, this);
			this._addDownArea = bind(this._addDownArea, this);
			this._addUpLoopArea = bind(this._addUpLoopArea, this);
			this.dispose = bind(this.dispose, this);
			this.update = bind(this.update, this);
			this.start = bind(this.start, this);
			ground.__super__.constructor.call(this);
			this._stageId;
			this._roadSize = roadSize;
			this._groundSize = 0;
			this._groundTotalSize = 0;
			this._addLoopGroundNum;
			this._loopZ = 0;
			this._loopGroundSize = 0;
			this._loopGroundTotalSize = 0;
			this._downAreaSize = 0;
			this._downAreaNum = 1;
			this._upAreaSize = 0;
			this._upAreaNum = 0;
			this._upArea2Num = 1;
			this._objects = [];
			this._animateMesh = [];
			this._kujira = [];
			this._doors;
			this._delayCall;
		}

		ground.prototype.start = function() {
			var animal, flg, fusha, i, kumo, obj, objDepth, offsetScale, orgObj, totalStgDepth;
			ground.__super__.start.call(this);
			this._delayCall = new root.MY_CLASS.delayCall();
			this._delayCall.start();
			this._stageId = this._game.stageId();
			orgObj = root.MY.gl.data.getStageObj3D(this._stageId, "stage");
			this._addLoopGroundNum = this._conf.LOOP_STAGE_NUM[this._stageId];
			totalStgDepth = 0;
			flg = true;
			i = 0;
			while (flg) {
				if (this._stageId === -1) {
					if (i % 2 === 0) {
						obj = orgObjA.clone();
					} else {
						obj = orgObj.clone();
					}
					objDepth = this.depthFromBBox(obj.children[0].geometry.boundingBox) * this._conf.GROUND_OFFSET.SCALE1;
					this._container.add(obj);
					obj.position.y = this._conf.GROUND_OFFSET.Y;
					obj.position.z = -totalStgDepth - (objDepth * 0.5);
				} else {
					obj = orgObj.clone();
					objDepth = this.depthFromBBox(orgObj.children[0].geometry.boundingBox) * this._conf.GROUND_OFFSET.SCALE1;
					switch (this._stageId) {
						case 0:
						case 1:
						case 2:
						case 3:
							if (i % 2 !== 0) {
								obj.scale.x = -1;
							} else {
								obj.scale.x = 1;
							}
							break;
						case 4:
							obj.scale.x = 1;
							obj.scale.z = 1;
							break;
						default:
							obj.scale.z = 1;
					}
					this._container.add(obj);
					obj.position.y = this._conf.GROUND_OFFSET.Y;
					obj.position.z = -totalStgDepth - (objDepth * 0.5);
					switch (this._stageId) {
						case 3:
							offsetScale = 1.2;
							obj.scale.x *= offsetScale;
							obj.scale.y *= offsetScale;
							obj.scale.z *= offsetScale;
							break;
						case 4:
							offsetScale = 1.195;
							obj.scale.x *= offsetScale;
							obj.scale.y *= offsetScale;
							obj.scale.z *= offsetScale;
					}
				}
				if (this._stageId !== 5 && this._stageId !== 6) {
					kumo = root.MY.gl.data.getCmnObj3D("cloud" + String(this._stageId)).clone();
					this._container.add(kumo);
					kumo.position.copy(obj.position);
					kumo.position.x = this._conf.CLOUD_POS.BASE_X + this._u.range(this._conf.CLOUD_POS.RANEGE_X);
					kumo.position.y = this._conf.CLOUD_POS.BASE_Y + this._u.range(this._conf.CLOUD_POS.RANEGE_Y);
					this._objects.push(kumo);
				}
				if (this._stageId === 0) {
					fusha = new root.MY_CLASS.fusha();
					fusha.start();
					this._container.add(fusha.container());
					fusha.show();
					fusha.container().position.z = obj.position.z;
					fusha.container().scale.x = obj.scale.x;
					this._objects.push(fusha);
				}
				if (this._stageId === 4) {
					animal = root.MY.gl.data.getCmnObj3D("stg4Etc").clone();
					this._container.add(animal);
					animal.scale.copy(obj.scale);
					animal.position.copy(obj.position);
					animal.position.z += 110;
					animal.position.y += 0;
					this._objects.push(animal);
				}
				totalStgDepth += objDepth;
				this._objects.push(obj);
				if (totalStgDepth * this._conf.GROUND_SCALE > this._roadSize || (this._stageId === 5 || this._stageId === 6)) {
					flg = false;
				}
				i++;
			}
			this._groundTotalSize = totalStgDepth;
			switch (this._stageId) {
				case 4:
					this._groundTotalSize -= 50;
			}
			if (this._stageId === 4) {
				this._addDownArea();
			}
			if (this._stageId === 5) {
				this._addUpArea();
			}
			if (this._stageId === 6) {
				this._addDownArea2();
			}
			this._addLoopGround();
			this._container.scale.set(this._conf.GROUND_SCALE, this._conf.GROUND_SCALE, this._conf.GROUND_SCALE);
			this._setStageObjects();
			return this.update();
		};

		ground.prototype.update = function() {
			ground.__super__.update.call(this);
			if (this._container.visible) {
				this._container.rotation.z = this._camera.rotation.z;
				this._container.position.x = -this._camera.position.x;
				this._container.position.y = -this._camera.position.y;
				if (!this._isSmt) {
					return this._updateVertices();
				}
			}
			
		};

		ground.prototype.dispose = function() {
			var i, j, len1, ref, val;
			if (this._objects != null) {
				ref = this._objects;
				for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
					val = ref[i];
					if (val != null) {
						this._container.remove(val);
						this._objects[i] = null;
					}
				}
				this._objects = null;
			}
			return ground.__super__.dispose.call(this);
		};

		ground.prototype._addUpLoopArea = function() {
			var depth, i, num, obj, orgObj, results;
			orgObj = root.MY.gl.data.getCmnObj3D("stageLoading6");
			depth = this.depthFromBBox(orgObj.children[0].geometry.boundingBox);
			depth *= this._loopOffsetScale();
			i = 0;
			num = ~~(this._groundTotalSize / depth);
			if (depth * num < this._groundTotalSize) {
				num += 1;
			}
			results = [];
			while (i < num) {
				obj = orgObj.clone();
				this._container.add(obj);
				if (i % 2 !== 0) {
					obj.scale.z = -1;
				} else {
					obj.scale.z = 1;
				}
				obj.position.y = this._conf.GROUND_OFFSET.Y;
				obj.position.z = -depth * i - depth * 0.5;
				this._objects.push(obj);
				results.push(i++);
			}
			return results;
		};

		ground.prototype._addDownArea = function() {
			var depth, i, num, obj, orgObj0, orgObj1;
			orgObj0 = root.MY.gl.data.getCmnObj3D("seaDown");
			orgObj1 = root.MY.gl.data.getCmnObj3D("stageLoading5");
			depth = this.depthFromBBox(orgObj1.children[0].geometry.boundingBox);
			depth *= this._loopOffsetScale();
			num = this._downAreaNum + 1;
			i = 0;
			while (i < num) {
				obj = i === 0 ? orgObj0.clone() : orgObj1.clone();
				this._container.add(obj);
				if (i % 2 !== 0) {
					obj.scale.x = -1;
				} else {
					obj.scale.x = 1;
				}
				obj.position.y = this._conf.GROUND_OFFSET.Y;
				obj.position.z = (-this._groundTotalSize + depth) - depth * i - depth * 0.5;
				this._objects.push(obj);
				i++;
			}
			return this._downAreaSize = depth * this._downAreaNum;
		};

		ground.prototype._addDownArea2 = function() {
			var depth, i, num, obj, orgObj;
			orgObj = root.MY.gl.data.getCmnObj3D("stageLoading6");
			depth = this.depthFromBBox(orgObj.children[0].geometry.boundingBox);
			depth *= this._loopOffsetScale();
			i = 0;
			num = this._upArea2Num + 2;
			while (i < num) {
				obj = orgObj.clone();
				this._container.add(obj);
				if (i % 2 !== 0) {
					obj.scale.x = -1;
				} else {
					obj.scale.x = 1;
				}
				obj.position.y = this._conf.GROUND_OFFSET.Y;
				obj.position.z = (-this._groundTotalSize + depth * 2) - depth * i - depth * 0.5;
				switch (this._stageId) {
					case 6:
						obj.position.y += this._conf.STG7_LOOP_OFFSET.Y;
				}
				this._objects.push(obj);
				i++;
			}
			return this._downAreaSize = depth * this._upArea2Num;
		};

		ground.prototype._addUpArea = function() {
			var depth, i, num, obj, orgObj;
			orgObj = root.MY.gl.data.getCmnObj3D("stageLoading6");
			depth = this.depthFromBBox(orgObj.children[0].geometry.boundingBox);
			depth *= this._loopOffsetScale();
			i = 0;
			num = this._upAreaNum;
			while (i < num) {
				obj = orgObj.clone();
				this._container.add(obj);
				if (i % 2 !== 0) {
					obj.scale.z = -1;
				} else {
					obj.scale.z = 1;
				}
				obj.position.y = this._conf.GROUND_OFFSET.Y;
				obj.position.z = -this._groundTotalSize - depth * i - depth * 0.5;
				this._objects.push(obj);
				i++;
			}
			return this._upAreaSize = depth * num;
		};

		ground.prototype._loopOffsetScale = function() {
			switch (this._stageId) {
				case 4:
					return 0.9;
				default:
					return this._conf.GROUND_OFFSET.SCALE2;
			}
		};

		ground.prototype._addLoopGround = function() {
			var i, loopNum, loopStartZ, obj, orgObj;
			orgObj = root.MY.gl.data.getCmnObj3D("stageLoading" + String(this._game.nextStageId()));
			this._loopGroundSize = this.depthFromBBox(orgObj.children[0].geometry.boundingBox);
			this._loopGroundSize *= this._loopOffsetScale();
			loopNum = 2;
			loopStartZ = -this._groundTotalSize;
			switch (this._stageId) {
				case 4:
					loopStartZ -= this._downAreaSize;
					break;
				case 5:
					loopStartZ -= this._upAreaSize;
					break;
				case 6:
					loopStartZ -= this._downAreaSize;
			}
			i = 0;
			while (i < this._addLoopGroundNum) {
				obj = orgObj.clone();
				this._container.add(obj);
				switch (this._stageId) {
					case 4:
						if (i % 2 !== 0) {
							obj.scale.z = -1;
						} else {
							obj.scale.z = 1;
						}
						break;
					default:
						if (i % 2 !== 0) {
							obj.scale.x = -1;
						} else {
							obj.scale.x = 1;
						}
				}
				obj.position.y = this._conf.GROUND_OFFSET.Y;
				obj.position.z = loopStartZ - this._loopGroundSize * i - this._loopGroundSize * 0.5;
				switch (this._stageId) {
					case 6:
						obj.position.y += this._conf.STG7_LOOP_OFFSET.Y;
				}
				this._objects.push(obj);
				i++;
			}
			this._loopGroundTotalSize = this._loopGroundSize * this._addLoopGroundNum;
			return this._loopZ = this._loopGroundSize * loopNum;
		};

		ground.prototype.loopZ = function() {
			return this._loopZ * this._conf.GROUND_SCALE;
		};

		ground.prototype.loopStartZ = function() {
			switch (this._stageId) {
				case 4:
					return -(this._groundTotalSize + this._downAreaSize) * this._conf.GROUND_SCALE;
				case 5:
					return -(this._groundTotalSize + this._upAreaSize) * this._conf.GROUND_SCALE;
				case 6:
					return -(this._groundTotalSize + this._downAreaSize) * this._conf.GROUND_SCALE;
				default:
					return -(this._groundTotalSize + this._loopGroundSize * 2) * this._conf.GROUND_SCALE;
			}
		};

		ground.prototype.loopGroundStartZ = function() {
			switch (this._stageId) {
				case 4:
					return -(this._groundTotalSize + this._downAreaSize) * this._conf.GROUND_SCALE;
				case 5:
					return -(this._groundTotalSize + this._upAreaSize) * this._conf.GROUND_SCALE;
				case 6:
					return -(this._groundTotalSize + this._downAreaSize) * this._conf.GROUND_SCALE;
				default:
					return -this._groundTotalSize * this._conf.GROUND_SCALE;
			}
		};

		ground.prototype.loopGroundZ = function() {
			return this._loopGroundTotalSize * this._conf.GROUND_SCALE;
		};

		ground.prototype.totalSize = function() {
			switch (this._stageId) {
				case 4:
					return (this._groundTotalSize + this._loopGroundTotalSize + this._downAreaSize) * this._conf.GROUND_SCALE;
				case 5:
					return (this._groundTotalSize + this._loopGroundTotalSize + this._upAreaSize) * this._conf.GROUND_SCALE;
				case 6:
					return (this._groundTotalSize + this._loopGroundTotalSize + this._downAreaSize) * this._conf.GROUND_SCALE;
				default:
					return (this._groundTotalSize + this._loopGroundTotalSize) * this._conf.GROUND_SCALE;
			}
		};

		ground.prototype.gameAreaSize = function() {
			return this._groundTotalSize * this._conf.GROUND_SCALE;
		};

		ground.prototype.gameAreaEndZ = function() {
			return -this._groundTotalSize * this._conf.GROUND_SCALE;
		};

		ground.prototype.minGameAreaSize = function() {
			return this._roadSize;
		};

		ground.prototype.downAreaSize = function() {
			return this._downAreaSize * this._conf.GROUND_SCALE;
		};

		ground.prototype.upAreaSize = function() {
			return this._upAreaSize * this._conf.GROUND_SCALE;
		};

		ground.prototype._setStageObjects = function() {
			var i, kujira, num, results;
			switch (this._stageId) {
				case 5:
					i = 0;
					num = 5;
					results = [];
					while (i < num) {
						kujira = new root.MY_CLASS.kujira(i);
						kujira.start();
						this._container.add(kujira.container());
						this._kujira.push(kujira);
						kujira.container().position.copy(this._objects[0].position);
						results.push(i++);
					}
					return results;
					break;
				case 6:
					this._doors = new root.MY_CLASS.doors();
					this._doors.start();
					this._container.add(this._doors.container());
					this._doors.container().position.copy(this._objects[0].position);
					return this._doors.container().position.z -= 980;
			}
		};

		ground.prototype.show = function() {
			var i, j, len1, ref, val;
			ground.__super__.show.call(this);
			ref = this._kujira;
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				val.show();
			}
			if (this._doors != null) {
				return this._doors.show();
			}
		};

		ground.prototype.hide = function() {
			var i, j, len1, ref, val;
			ground.__super__.hide.call(this);
			ref = this._kujira;
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				val.hide();
			}
			if (this._doors != null) {
				return this._doors.hide();
			}
		};

		ground.prototype._addVerticesAnimation = function(obj) {};

		ground.prototype._updateVertices = function() {
			var ang, bbox, d, dx, dz, i, j, len1, num, pos, ref, results, val, x, y, z;
			ang = Date.now() * 0.05;
			ref = this._animateMesh;
			results = [];
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				bbox = val.geometry.boundingBox;
				pos = val.geometry.attributes.position.array;
				i = 0;
				num = pos.length;
				while (i < num) {
					x = pos[i];
					y = pos[i + 1];
					z = pos[i + 2];
					if (y != null) {
						dx = bbox.min.x - x;
						dz = bbox.min.z - z;
						d = Math.sqrt(dx * dx + dz * dz) / 0.45;
						pos[i + 1] += Math.sin(this._u.radian(ang + d)) * 0.045;
					}
					i += 3;
				}
				val.geometry.attributes.position.needsUpdate = true;
				val.geometry.computeFaceNormals();
				results.push(val.geometry.computeVertexNormals());
			}
			return results;
		};

		ground.prototype.openDoor = function() {
			if (this._doors != null) {
				return this._doors.open();
			}
		};

		return ground;

	}