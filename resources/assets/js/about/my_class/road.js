export default function(superClass) {
		extend(road, superClass);

		function road(pos, hitCheaker) {
			this._lifeUpEffectLing = bind(this._lifeUpEffectLing, this);
			this._eCompleteMaxCombo = bind(this._eCompleteMaxCombo, this);
			this.disposeGround = bind(this.disposeGround, this);
			this.disposeStgparts = bind(this.disposeStgparts, this);
			this.disposeItems = bind(this.disposeItems, this);
			this.disposeRoad = bind(this.disposeRoad, this);
			this._hideAllItem = bind(this._hideAllItem, this);
			this._hitTestItems = bind(this._hitTestItems, this);
			this._eClick = bind(this._eClick, this);
			this._updateLookOffset = bind(this._updateLookOffset, this);
			this.mesh = bind(this.mesh, this);
			this.dispose = bind(this.dispose, this);
			this._getUseItem = bind(this._getUseItem, this);
			this._eAddItemAtRoad = bind(this._eAddItemAtRoad, this);
			this._initRoadParam = bind(this._initRoadParam, this);
			this._enterNextStage = bind(this._enterNextStage, this);
			this._setUpNextStage = bind(this._setUpNextStage, this);
			this._endStage = bind(this._endStage, this);
			this._hideEtcStage = bind(this._hideEtcStage, this);
			this.usableGame = bind(this.usableGame, this);
			this._offsetLoadAtY = bind(this._offsetLoadAtY, this);
			this._offsetLoadAtX = bind(this._offsetLoadAtX, this);
			this._getLoadAtPos = bind(this._getLoadAtPos, this);
			this._checkSeaState = bind(this._checkSeaState, this);
			this.update = bind(this.update, this);
			this._setPositionAtRoad = bind(this._setPositionAtRoad, this);
			this._computeNextStageAt = bind(this._computeNextStageAt, this);
			this._computeLoopStartAt = bind(this._computeLoopStartAt, this);
			this.reset = bind(this.reset, this);
			this._makeRing = bind(this._makeRing, this);
			this._makeItemRankTable = bind(this._makeItemRankTable, this);
			this._makeItems = bind(this._makeItems, this);
			this._hideRing = bind(this._hideRing, this);
			this._setRing = bind(this._setRing, this);
			this._setStgparts = bind(this._setStgparts, this);
			this._hideStgparts = bind(this._hideStgparts, this);
			this._makeStgparts = bind(this._makeStgparts, this);
			this._addGround = bind(this._addGround, this);
			this._getDepthGeometry = bind(this._getDepthGeometry, this);
			this._switchRoad = bind(this._switchRoad, this);
			this.makeRoad = bind(this.makeRoad, this);
			this._getAtFromX2 = bind(this._getAtFromX2, this);
			this._getAtFromX = bind(this._getAtFromX, this);
			this._getAtFromZ = bind(this._getAtFromZ, this);
			this._makeRoadGeometryFromSplinePoints = bind(this._makeRoadGeometryFromSplinePoints, this);
			this._addLoopAreaSplinePoints = bind(this._addLoopAreaSplinePoints, this);
			this._makeGameAreaSplinePoints = bind(this._makeGameAreaSplinePoints, this);
			this.goNextStage = bind(this.goNextStage, this);
			this.isDraw = bind(this.isDraw, this);
			this.stopRun = bind(this.stopRun, this);
			this.startRun = bind(this.startRun, this);
			this.start = bind(this.start, this);
			road.__super__.constructor.call(this);
			this._geo;
			this._mesh;
			this._nextGeo;
			this._nextMesh;
			this._binormal = new THREE.Vector3();
			this._normal = new THREE.Vector3();
			this._cameraRot;
			this._mat;
			this._maxAt = 0;
			this._lookOffset = {
				x: 0,
				y: 0
			};
			this._at = 0;
			this._bufAt = 0;
			this._atP = 0;
			this._runSpeed = 0;
			this._runSpeedTg = 0;
			this._loopStartAt = 0;
			this._nextStageAt = 0;
			this._loopCnt = 0;
			this._baseFloor = 0;
			this._baseFloorTg = 0;
			this._sky;
			this._sea;
			this._line;
			this._comboMaxEffect;
			this._showItemMgr;
			this._ring = [];
			this._items = [];
			this._stgparts = [];
			this._ground = [];
			this._nowGround;
			this._hitRay;
			this._isInSea = false;
			this._inSeaAt = 0;
			this._outSeaAt = 0;
			this._isPlaying = false;
			this._isMakeRoad = false;
			this._isDraw = true;
			this._isPlayingGame = false;
			this._isShowItem = false;
			this._isEnterLoopArea = false;
			this.onGetItem;
			this.onEndStage;
			this.onEnterLoopArea;
			this.onSetupNextStage;
			this.onEnterNextStage;
			this.onStartNextStage;
		}

		road.prototype.start = function() {
			var roadTex;
			road.__super__.start.call(this);
			this._cameraRot = this._camera.rotation.clone();
			this._hitRay = new THREE.Raycaster();
			this._interaction.addOnClick(this._eClick);
			roadTex = THREE.ImageUtils.loadTexture(this._conf.PATH_IMG.TEX + "niji.jpg");
			this._mat = new THREE.MeshBasicMaterial({
				map: roadTex
			});
			this._sky = new root.MY_CLASS.sky();
			this._sky.start();
			this._sea = new root.MY_CLASS.sea();
			this._sea.start();
			this._line = new root.MY_CLASS.line();
			this._line.start();
			this._line.show();
			this._line.onCompleteMaxCombo = this._eCompleteMaxCombo;
			this._comboMaxEffect = new root.MY_CLASS.comboMax();
			this._comboMaxEffect.start();
			this._makeItems();
			if (!this._conf.IS_CAP) {
				this._makeRing();
			}
			this._showItemMgr = new root.MY_CLASS.showItemMgr(this._items);
			this._showItemMgr.onShowItem = this._eAddItemAtRoad;
			this._showItemMgr.start();
			return this._isPlaying = true;
		};

		road.prototype.startRun = function() {
			this._isPlaying = true;
			this._isPlayingGame = true;
			this._isShowItem = false;
			this._baseFloor = this._conf.BASE_FLOOR;
			this._sky.show();
			this._sea.hide();
			this._initRoadParam();
			this._camera.rotation.z = this._cameraRot.z = 1.5707963267948966 + this._u.radian(0);
			return this._cameraRot = this._camera.rotation.clone();
		};

		road.prototype.stopRun = function() {
			this._isPlaying = false;
			return this.update();
		};

		road.prototype.isDraw = function(bool) {
			var ground;
			this._isDraw = bool;
			this.update();
			if (bool) {
				this._container.visible = true;
				this._sky.show();
			} else {
				this._container.visible = false;
				this._sky.hide();
			}
			ground = this._ground[this._game.stageId()];
			if (ground != null) {
				return ground.update();
			}
		};

		road.prototype.goNextStage = function() {
			return this.makeRoad(true);
		};

		road.prototype._makeGameAreaSplinePoints = function(stageId) {
			var arr, i, j, key, len1, p, val;
			switch (stageId) {
				case 4:
					p = this._conf.ROAD_POINT[0];
					break;
				case 5:
					p = this._conf.ROAD_POINT[1];
					break;
				case 6:
					p = this._conf.ROAD_POINT[2];
					break;
				default:
					key = this._u.random(3, 6);
					p = this._conf.ROAD_POINT[key];
			}
			arr = [];
			for (i = j = 0, len1 = p.length; j < len1; i = ++j) {
				val = p[i];
				arr.push(new THREE.Vector3(val.x, val.y, val.z));
			}
			return arr;
		};

		road.prototype._addLoopAreaSplinePoints = function(stageId, points) {
			var addZ, i, last, len, results, x, y, z;
			last = points[points.length - 1];
			x = last.x;
			y = last.y;
			z = last.z;
			addZ = this._conf.GAME_SPEED[this._game.stageId()];
			i = 0;
			len = this._conf.ROAD_SPLINE_POINT_NUM[this._game.stageId()] - points.length;
			results = [];
			while (i < len) {
				switch (stageId) {
					case 4:
						if (i < 8) {
							z -= addZ * 0.5;
						} else {
							z -= addZ;
						}
						x = this._conf.STG5_OFFSET_Y;
						y = this._conf.LOOP_PT.Y;
						break;
					case 5:
						if (i < 16) {
							z -= addZ * 0.5;
						} else {
							z -= addZ;
						}
						x = this._conf.LOOP_PT.X;
						break;
					case 6:
						z -= addZ;
						x += (this._conf.LOOP_PT.Y - x) * 0.3;
						break;
					default:
						z -= addZ;
						x = this._conf.LOOP_PT.X;
						y = this._conf.LOOP_PT.Y;
				}
				points.push(new THREE.Vector3(x, y, z));
				results.push(i++);
			}
			return results;
		};

		road.prototype._makeRoadGeometryFromSplinePoints = function(points) {
			var geo, radSegments, radius, segments, spline;
			segments = 5000;
			radius = 10;
			radSegments = 2;
			spline = new THREE.SplineCurve3(points);
			geo = new THREE.TubeGeometry(spline, segments, radius, radSegments, false);
			geo.computeBoundingSphere();
			geo.computeBoundingBox();
			return geo;
		};

		road.prototype._getAtFromZ = function(z, useGeometry, useMesh) {
			var add, pos, t;
			pos = new THREE.Vector3();
			t = 0;
			add = this._conf.ROAD_ANALYZE_P;
			while (t < 1) {
				pos = useGeometry.parameters.path.getPointAt(t);
				if (pos.z <= z) {
					return t;
				}
				t += add;
			}
			return 1;
		};

		road.prototype._getAtFromX = function(x, useGeometry) {
			var add, pos, t;
			t = 0;
			add = this._conf.ROAD_ANALYZE_P;
			while (t < 1) {
				pos = useGeometry.parameters.path.getPointAt(t);
				if (pos.x >= x) {
					return t;
				}
				t += add;
			}
			return 1;
		};

		road.prototype._getAtFromX2 = function(x, useGeometry) {
			var add, pos, t;
			t = 0;
			add = this._conf.ROAD_ANALYZE_P;
			while (t < 1) {
				pos = useGeometry.parameters.path.getPointAt(t);
				if (pos.x <= x) {
					return t;
				}
				t += add;
			}
			return 1;
		};

		road.prototype.makeRoad = function(isNext) {
			var dd, gameAreaGeometry, gameAreaSize, gameAreaSize2, gameAreaStgSize, i, last, lastZ, maxAt, mesh, needRoadSize, num, offsetZ, roadGeo, roadPoints, totalStgSize;
			if (isNext == null) {
				isNext = false;
			}
			roadPoints = this._makeGameAreaSplinePoints(this._game.stageId());
			gameAreaGeometry = this._makeRoadGeometryFromSplinePoints(roadPoints);
			gameAreaSize = this._getDepthGeometry(gameAreaGeometry);
			gameAreaGeometry.dispose();
			switch (this._game.stageId()) {
				case 4:
					gameAreaSize2 = gameAreaSize - this._conf.GAME_END_OFFSET[this._game.stageId()];
					break;
				default:
					gameAreaSize2 = gameAreaSize;
			}
			this._addGround(gameAreaSize2);
			gameAreaStgSize = this._ground[this._game.stageId()].gameAreaSize();
			totalStgSize = this._ground[this._game.stageId()].totalSize();
			needRoadSize = totalStgSize - gameAreaSize;
			offsetZ = -1000;
			last = roadPoints[roadPoints.length - 1];
			lastZ = last.z - needRoadSize + offsetZ;
			i = 1;
			dd = 380;
			if (this._game.stageId() === 4) {
				dd = 450;
			}
			if (this._game.stageId() === 5) {
				dd = 450;
			}
			if (this._game.stageId() === 6) {
				dd = 850;
			}
			num = ~~(needRoadSize / dd) + 1;
			while (i <= num) {
				roadPoints.push(new THREE.Vector3(last.x, last.y, last.z + i * ((lastZ - last.z) / num)));
				i++;
			}
			roadGeo = this._makeRoadGeometryFromSplinePoints(roadPoints);
			mesh = new THREE.Mesh(roadGeo, this._mat);
			this._container.add(mesh);
			if (isNext) {
				this._nextGeo = roadGeo;
				this._nextMesh = mesh;
			} else {
				this._geo = roadGeo;
				this._mesh = mesh;
			}
			maxAt = this._getAtFromZ(this._ground[this._game.stageId()].gameAreaEndZ(), this._nextGeo || this._geo, this._nextMesh || this._mesh);
			this._setStgparts(maxAt);
			return this._isMakeRoad = true;
		};

		road.prototype._switchRoad = function() {
			if (this._mesh != null) {
				this._container.remove(this._mesh);
				this._mesh = null;
				this._geo.dispose();
				this._geo = null;
			}
			this._geo = this._nextGeo;
			this._mesh = this._nextMesh;
			this._nextGeo = null;
			return this._nextMesh = null;
		};

		road.prototype._getDepthGeometry = function(geometry) {
			return this.depthFromBBox(geometry.boundingBox);
		};

		road.prototype._addGround = function(gameAreaSize) {
			var ground;
			if (this._ground[this._game.stageId()] != null) {
				ground = this._ground[this._game.stageId()];
				ground.container().position.z = 0;
				ground.container().visible = true;
				ground.show();
			} else {
				ground = new root.MY_CLASS.ground(gameAreaSize);
				ground.start();
				ground.show();
			}
			if (this._nowGround == null) {
				this._nowGround = ground;
			}
			return this._ground[this._game.stageId()] = ground;
		};

		road.prototype._makeStgparts = function() {};

		road.prototype._hideStgparts = function() {};

		road.prototype._setStgparts = function(maxAt) {};

		road.prototype._setRing = function() {
			var i, num, pos, results, ring, t;
			num = this._ring.length;
			i = 0;
			results = [];
			while (i < num) {
				t = (i / num) * this._maxAt;
				pos = this._getLoadAtPos(t, 0);
				this._offsetLoadAtY(pos, 10);
				ring = this._ring[i];
				ring.show(pos);
				results.push(i++);
			}
			return results;
		};

		road.prototype._hideRing = function() {
			var i, j, len1, ref, results, val;
			ref = this._ring;
			results = [];
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				results.push(val.hide());
			}
			return results;
		};

		road.prototype._makeItems = function() {
			var i, item, len, rankTable, results;
			rankTable = this._makeItemRankTable();
			i = 0;
			len = this._conf.PRE_SET_ITEM_NUM;
			results = [];
			while (i < len) {
				item = new root.MY_CLASS.item(rankTable[i] || 0);
				item.start();
				this._items.push(item);
				results.push(i++);
			}
			return results;
		};

		road.prototype._makeItemRankTable = function() {
			var i, j, k, l, len1, len2, nums, ref, table, val;
			table = [];
			nums = [];
			ref = this._conf.ITEM_RANK_RATE;
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				nums[i] = ~~(val * this._conf.PRE_SET_ITEM_NUM);
			}
			for (i = k = 0, len2 = nums.length; k < len2; i = ++k) {
				val = nums[i];
				l = 0;
				while (l < val) {
					table.push(i);
					l++;
				}
			}
			return table;
		};

		road.prototype._makeRing = function() {
			var i, len, results, ring;
			i = 0;
			len = this._conf.PRE_SET_RING_NUM;
			results = [];
			while (i < len) {
				ring = new root.MY_CLASS.ring(i);
				ring.start();
				this._ring.push(ring);
				results.push(i++);
			}
			return results;
		};

		road.prototype.reset = function() {
			var ground;
			road.__super__.reset.call(this);
			this._isPlaying = false;
			this._isMakeRoad = false;
			this._isPlayingGame = false;
			this._isShowItem = true;
			this._at = 0;
			this._hideStgparts();
			this._hideAllItem();
			this._hideRing();
			this._hideEtcStage();
			this._nowGround = null;
			this.disposeRoad();
			this._line.reset();
			ground = this._ground[this._game.stageId()];
			if (ground != null) {
				ground.container().position.z = 0;
				return ground.container().visible = true;
			}
		};

		road.prototype._computeLoopStartAt = function() {
			var add, pos, t;
			pos = new THREE.Vector3();
			t = this._maxAt;
			add = this._conf.ROAD_ANALYZE_P;
			while (t < 1) {
				pos = this._geo.parameters.path.getPointAt(t);
				if (pos.z <= this._nowGround.container().position.z + this._nowGround.loopStartZ()) {
					this._loopStartAt = t;
					return;
				}
				t += add;
			}
			return this._loopStartAt = t;
		};

		road.prototype._computeNextStageAt = function() {
			var add, maxZ, pos, t;
			pos = new THREE.Vector3();
			maxZ = -this._nowGround.totalSize();
			t = this._loopStartAt;
			add = this._conf.ROAD_ANALYZE_P;
			while (t < 1) {
				pos = this._geo.parameters.path.getPointAt(t);
				if (pos.z <= maxZ) {
					this._nextStageAt = t;
					return;
				}
				t += add;
			}
			return this._nextStageAt = t;
		};

		road.prototype._setPositionAtRoad = function(at, position, useGeometry, useMesh) {
			var dir, pick, pickNext, pickt, pos, segments;
			pos = useGeometry.parameters.path.getPointAt(at);
			segments = useGeometry.tangents.length;
			pickt = at * segments;
			pick = Math.floor(pickt);
			pickNext = (pick + 1) % segments;
			if ((useGeometry.binormals[pickNext] != null) && (useGeometry.binormals[pick] != null)) {
				this._binormal.subVectors(useGeometry.binormals[pickNext], useGeometry.binormals[pick]);
				this._binormal.multiplyScalar(pickt - pick).add(useGeometry.binormals[pick]);
			}
			dir = useGeometry.parameters.path.getTangentAt(at);
			this._normal.copy(this._binormal).cross(dir);
			pos.add(this._binormal.clone().multiplyScalar(this._baseFloor));
			position.copy(pos);
			return position.z += useMesh.position.z;
		};

		road.prototype.update = function() {
			var ease, eyeDist, lookAt, newAt, now, nowSpeed, speedEase, tg0, tg1;
			road.__super__.update.call(this);
			if (!this._isDraw) {
				return;
			}
			this._baseFloorTg = this._conf.BASE_FLOOR;
			this._updateLookOffset();
			this._hitTestItems(this._interaction.mouse().x, this._interaction.mouse().y);
			if (this._isPlaying) {
				if (this.usableGame()) {
					newAt = this._audio.stgBgmRate() * this._maxAt;
					nowSpeed = newAt - this._bufAt;
					this._bufAt = newAt;
					speedEase = this._game.clearStageNum() > 0 && this._at < 0.1 ? 0.01 : 0.75;
					this._runSpeed += (nowSpeed - this._runSpeed) * speedEase;
					tg0 = this._at + this._runSpeed;
					tg1 = this._bufAt;
					this._atP = Math.min(this._atP += 0.000002, 1);
					this._at = tg0 * (1 - this._atP) + tg1 * this._atP;
					if (this._game.clearStageNum() === 0 && this._bufAt > 0.008) {
						this._isShowItem = true;
					} else {
						if (!this._isShowItem && this._bufAt > this._conf.GAME_START_LOAD_AT[this._game.stageId()]) {
							this._isShowItem = true;
							if (this.onStartNextStage != null) {
								this.onStartNextStage();
							}
						}
					}
				} else {
					this._at = Math.min(1, this._at += this._runSpeed);
					if (this._game.stageId() === 4 || this._game.stageId() === 5) {
						if (this._isEnterLoopArea) {
							this._runSpeed += (this._runSpeedTg - this._runSpeed) * 0.02;
						} else {
							this._runSpeed += (this._runSpeedTg - this._runSpeed) * 0.002;
						}
					} else {
						this._runSpeed += (this._runSpeedTg - this._runSpeed) * 0.02;
					}
					this._baseFloorTg = this._conf.BASE_FLOOR + 0;
				}
			} else {
				this._at = this._at;
			}
			this._baseFloor += (this._baseFloorTg - this._baseFloor) * 0.05;
			this._setPositionAtRoad(this._at, this._camera.position, this._geo, this._mesh);
			if (!this.usableGame()) {
				this._endStage();
				if (this._isMakeRoad && this._loopCnt > 0) {
					if (this._nextStageAt <= this._at || this._at >= 1) {
						this._enterNextStage();
						this._setPositionAtRoad(this._at, this._camera.position, this._geo, this._mesh);
					}
				} else {
					if (!this._isEnterLoopArea && this._camera.position.z < this._nowGround.container().position.z + this._nowGround.loopGroundStartZ()) {
						this._isEnterLoopArea = true;
						this._hideStgparts();
						if (this.onEnterLoopArea != null) {
							this.onEnterLoopArea();
						}
					}
					if (this._camera.position.z < (this._nowGround.container().position.z + this._nowGround.loopStartZ()) - this._nowGround.loopZ()) {
						this._loopCnt++;
						this._nowGround.container().position.z = this._mesh.position.z = this._nowGround.totalSize();
						this._at -= this._at - this._loopStartAt;
						this._setPositionAtRoad(this._at, this._camera.position, this._geo, this._mesh);
						if (this._loopCnt === 1) {
							this._setUpNextStage();
						}
					}
				}
			}
			eyeDist = this._conf.LOOK_AT_ROAD;
			now = (this._at + eyeDist / this._geo.parameters.path.getLength()) % 1;
			lookAt = this._geo.parameters.path.getPointAt(now);
			lookAt.z += this._mesh.position.z;
			if (this._isShowItem && this.usableGame()) {
				if (this._showItemMgr.showItem(this._at)) {
					this._u.shuffle(this._items);
				}
			}
			lookAt.add(this._binormal.clone().multiplyScalar(this._baseFloor + this._lookOffset.y));
			lookAt.add(this._normal.clone().multiplyScalar(this._lookOffset.x));
			this._camera.matrix.lookAt(this._camera.position, lookAt, this._binormal);
			this._cameraRot.setFromRotationMatrix(this._camera.matrix, this._camera.rotation.order);
			ease = this._at < 0.005 && this._game.clearStageNum() > 0 ? 0.001 : 0.2;
			this._camera.rotation.x += (this._cameraRot.x - this._camera.rotation.x) * ease;
			this._camera.rotation.y += (this._cameraRot.y - this._camera.rotation.y) * ease;
			this._camera.rotation.z += (this._cameraRot.z - this._camera.rotation.z) * ease;
			this._checkSeaState(this._at);
			if (this._game.stageId() === 6 && this._bufAt >= 0.28 && (this._nowGround != null)) {
				return this._nowGround.openDoor();
			}
		};

		road.prototype._checkSeaState = function(t) {
			if (this._inSeaAt !== -1 && !this._sea.container().visible && t >= this._inSeaAt) {
				this._sky.hide();
				this._sea.show();
				this._audio.playSeaDownSe();
			}
			if (this._outSeaAt !== -1 && !this._sky.container().visible && t >= this._outSeaAt) {
				this._sky.show();
				this._sea.hide();
				return this._audio.playSeaUpSe();
			}
		};

		road.prototype._getLoadAtPos = function(t, offset) {
			var at, dir, geo, pick, pickNext, pickt, segments;
			if (this._nextGeo != null) {
				geo = this._nextGeo;
			} else {
				geo = this._geo;
			}
			at = (t + offset / geo.parameters.path.getLength()) % 1;
			segments = geo.tangents.length;
			pickt = t * segments;
			pick = Math.floor(pickt);
			pickNext = (pick + 1) % segments;
			if ((geo.binormals[pickNext] != null) && (geo.binormals[pick] != null)) {
				this._binormal.subVectors(geo.binormals[pickNext], geo.binormals[pick]);
				this._binormal.multiplyScalar(pickt - pick).add(geo.binormals[pick]);
			}
			dir = geo.parameters.path.getTangentAt(t);
			this._normal.copy(this._binormal).cross(dir);
			return geo.parameters.path.getPointAt(at);
		};

		road.prototype._offsetLoadAtX = function(pos, offset) {
			return pos.add(this._normal.clone().multiplyScalar(offset));
		};

		road.prototype._offsetLoadAtY = function(pos, offset) {
			return pos.add(this._binormal.clone().multiplyScalar(offset));
		};

		road.prototype.usableGame = function() {
			if (this._at > this._bufAt) {
				return this._at < this._maxAt;
			} else {
				return this._bufAt < this._maxAt;
			}
		};

		road.prototype._hideEtcStage = function() {
			var i, j, len1, ref, results, val;
			ref = this._ground;
			results = [];
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				if ((val != null) && i !== this._game.stageId()) {
					val.container().position.z = 0;
					results.push(val.hide());
				} else {
					results.push(void 0);
				}
			}
			return results;
		};

		road.prototype._endStage = function() {
			if (this._isPlayingGame && this._isMakeRoad) {
				this._isPlayingGame = false;
				this._isMakeRoad = false;
				this._computeLoopStartAt();
				this._computeNextStageAt();
				this._hideRing();
				if (this.onEndStage != null) {
					return this.onEndStage();
				}
			}
		};

		road.prototype._setUpNextStage = function() {
			if (this.onSetupNextStage != null) {
				return this.onSetupNextStage();
			}
		};

		road.prototype._enterNextStage = function() {
			this._switchRoad();
			this._nowGround = this._ground[this._game.stageId()];
			this._isPlayingGame = true;
			this._isShowItem = false;
			this._hideEtcStage();
			this._hideAllItem();
			this._initRoadParam();
			this._sky.setSky(this._game.stageId(), true);
			if (this.onEnterNextStage != null) {
				return this.onEnterNextStage();
			}
		};

		road.prototype._initRoadParam = function() {
			this._at = 0;
			this._bufAt = 0;
			this._atP = 0;
			this._loopStartAt = 0;
			this._loopCnt = 0;
			this._isEnterLoopArea = false;
			this._runSpeedTg = this._conf.LOOP_AREA_SPEED[this._game.stageId()];
			this._inSeaAt = -1;
			this._outSeaAt = -1;
			if (this._game.stageId() === 4) {
				this._inSeaAt = this._getAtFromX(-this._conf.GROUND_OFFSET.Y, this._geo);
			} else if (this._game.stageId() === 5) {
				this._outSeaAt = this._getAtFromX2(-this._conf.GROUND_OFFSET.Y + 100, this._geo);
			}
			switch (this._game.stageId()) {
				case 4:
					this._maxAt = this._getAtFromZ(-this._nowGround.minGameAreaSize() + this._conf.GAME_END_OFFSET[this._game.stageId()], this._geo, this._mesh);
					break;
				case 5:
					this._maxAt = this._getAtFromZ(-this._nowGround.minGameAreaSize() + this._conf.GAME_END_OFFSET[this._game.stageId()], this._geo, this._mesh);
					break;
				case 6:
					this._maxAt = this._getAtFromZ(-this._nowGround.minGameAreaSize() + this._conf.GAME_END_OFFSET[this._game.stageId()], this._geo, this._mesh);
					break;
				default:
					this._maxAt = this._getAtFromZ(this._nowGround.gameAreaEndZ() + this._conf.GAME_END_OFFSET[this._game.stageId()], this._geo, this._mesh);
			}
			return this._setRing();
		};

		road.prototype._eAddItemAtRoad = function(at, offsetX, offsetY, order, interval, zOffset) {
			var itemAt, itemPos, rank, useItem, z, zRange;
			useItem = this._getUseItem();
			if (useItem == null) {
				return;
			}
			rank = useItem.rank();
			zRange = this._conf.SHOW_ITEM_Z[this._game.stageId()];
			z = this._u.random(zRange[0], zRange[1]) + zOffset;
			if (this._isSmt && Math.abs(window.orientation) === 90) {
				z *= 0.9;
			}
			itemAt = (at + z / this._geo.parameters.path.getLength()) % 1;
			itemPos = this._geo.parameters.path.getPointAt(itemAt);
			itemPos.add(this._binormal.clone().multiplyScalar(this._baseFloor + offsetY));
			itemPos.add(this._normal.clone().multiplyScalar(offsetX));
			useItem.show(itemPos, order, interval);
			return useItem;
		};

		road.prototype._getUseItem = function() {
			var i, j, len1, ref, val;
			ref = this._items;
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				if (!val.isContainStage()) {
					return val;
				}
			}
			return null;
		};

		road.prototype.dispose = function() {
			return road.__super__.dispose.call(this);
		};

		road.prototype.mesh = function() {
			return this._mesh;
		};

		road.prototype._updateLookOffset = function() {
			var ease, nm, rangeX, rangeY, tx, ty;
			if (root.MY.myfw.conf.IS_SMT) {
				ease = this._parameter.get("moveSpeed");
				nm = this._interaction.getNormalizeDeviceAng();
				rangeX = this._parameter.get("moveX");
				rangeY = this._parameter.get("moveY");
				tx = this._u.map(nm.x, rangeX, -rangeX, 0, 1);
				ty = this._u.map(nm.y, -rangeY, rangeY, 0, 1);
			} else {
				ease = this._parameter.get("moveSpeed");
				nm = this._interaction.getNormalizeMousePos();
				rangeX = this._parameter.get("moveX");
				rangeY = this._parameter.get("moveY");
				tx = this._u.map(nm.x, rangeX, -rangeX, 0, 1);
				ty = this._u.map(nm.y, rangeY, -rangeY, 0, 1);
			}
			this._lookOffset.x += (tx - this._lookOffset.x) * ease;
			return this._lookOffset.y += (ty - this._lookOffset.y) * ease;
		};

		road.prototype._eClick = function(mouse) {
			if (!this._isPlaying) {
				return;
			}
			return this._hitTestItems(mouse.x, mouse.y);
		};

		road.prototype._hitTestItems = function(x, y) {
			var combo, i, intersects, item, j, len1, obj, ref, testItems, val, vec, x2, y2;
			if (!this._isPlaying || !this.usableGame()) {
				return;
			}
			testItems = [];
			ref = this._items;
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				if ((val != null) && val.isHitTarget()) {
					obj = val.get3dObject();
					obj.listKey = i;
					testItems.push(obj);
				}
			}
			x2 = (x / root.MY.myfw.stageWidth()) * 2 - 1;
			y2 = -(y / root.MY.myfw.stageHeight()) * 2 + 1;
			vec = new THREE.Vector3(x2, y2, 0.5);
			vec.unproject(this._camera);
			vec = vec.sub(this._camera.position).normalize();
			this._hitRay.set(this._camera.position, vec);
			intersects = this._hitRay.intersectObjects(testItems);
			if (intersects.length > 0) {
				item = this._items[intersects[0].object.listKey];
				if (item != null) {
					this._line.addPoint(item.container().position.clone(), item.rank());
					combo = this._line.getCombo();
					item.hitAnimation(combo);
					this._lifeUpEffectLing();
					if (this.onGetItem != null) {
						return this.onGetItem(item.rank(), combo);
					}
				}
			}
		};

		road.prototype._hideAllItem = function() {
			var i, j, len1, ref, results, val;
			if (this._items != null) {
				ref = this._items;
				results = [];
				for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
					val = ref[i];
					if (val != null) {
						results.push(val.hide());
					} else {
						results.push(void 0);
					}
				}
				return results;
			}
		};

		road.prototype.disposeRoad = function() {
			if (this._mesh != null) {
				this._container.remove(this._mesh);
				if (this._geo != null) {
					this._geo.dispose();
					this._geo = null;
				}
				this._mesh = null;
			}
			if (this._nextMesh != null) {
				this._container.remove(this._nextMesh);
				if (this._nextGeo != null) {
					this._nextGeo.dispose();
					this._nextGeo = null;
				}
				return this._nextMesh = null;
			}
		};

		road.prototype.disposeItems = function() {
			var i, j, len1, ref, val;
			if (this._items != null) {
				ref = this._items;
				for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
					val = ref[i];
					if (val != null) {
						val.dispose();
						this._items[i] = null;
					}
				}
				return this._items = [];
			}
		};

		road.prototype.disposeStgparts = function() {
			var i, j, len1, ref, val;
			if (this._stgparts != null) {
				ref = this._stgparts;
				for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
					val = ref[i];
					if (val != null) {
						val.dispose();
						this._stgparts[i] = null;
					}
				}
				return this._stgparts = [];
			}
		};

		road.prototype.disposeGround = function() {};

		road.prototype._eCompleteMaxCombo = function(point) {
			return this._comboMaxEffect.show(point);
		};

		road.prototype._lifeUpEffectLing = function() {
			var i, j, len1, ref, results, val;
			ref = this._ring;
			results = [];
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				results.push(val.lifeUp());
			}
			return results;
		};

		return road;

	}