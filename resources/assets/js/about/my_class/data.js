export default function() {
		function data() {
			this._eCompleteStgBgm = bind(this._eCompleteStgBgm, this);
			this._eCompleteStageObj = bind(this._eCompleteStageObj, this);
			this._eProgressStageObj = bind(this._eProgressStageObj, this);
			this._getObjList = bind(this._getObjList, this);
			this.loadNextStage = bind(this.loadNextStage, this);
			this._eCompleteMultiObjData = bind(this._eCompleteMultiObjData, this);
			this.getStageObj3D = bind(this.getStageObj3D, this);
			this.getCmnObj3D = bind(this.getCmnObj3D, this);
			this._eCompleteCmnObjData = bind(this._eCompleteCmnObjData, this);
			this._eProgressCmnObjData = bind(this._eProgressCmnObjData, this);
			this._makeStgpartsTex = bind(this._makeStgpartsTex, this);
			this._makeEtcStageTex = bind(this._makeEtcStageTex, this);
			this._makeStageTex = bind(this._makeStageTex, this);
			this.start = bind(this.start, this);
			this._skyTex;
			this._itemTex;
			this._stageTex = [];
			this._etcStageTex = [];
			this._stgpartsTex = [];
			this._cmnObjMgr;
			this._stageObjMgr = [];
			this._clouds = [];
			this._conf = root.MY.app.conf;
			this.onProgress;
			this.onComplete;
			this.onProgressNextData;
			this.onCompleteNextData;
			this._delayCall;
		}

		data.prototype.start = function() {
			this._delayCall = new root.MY_CLASS.delayCall();
			this._delayCall.start();
			this._itemTex = THREE.ImageUtils.loadTexture(root.MY.app.conf.FILE_ITEM_TEX);
			this._makeStageTex();
			this._makeEtcStageTex();
			this._makeStgpartsTex();
			this._cmnObjMgr = new root.MY_CLASS.multiObjLoader();
			this._cmnObjMgr.onProgress = this._eProgressCmnObjData;
			this._cmnObjMgr.onComplete = this._eCompleteCmnObjData;
			return this._cmnObjMgr.load([
				{
					key: "stageLoading0",
					file: this._conf.FILE_STAGE_LOADING_OBJ[6],
					tex: this._stageTex[6],
					rePos: true
				}, {
					key: "stageLoading1",
					file: this._conf.FILE_STAGE_LOADING_OBJ[1],
					tex: this._stageTex[1],
					rePos: true
				}, {
					key: "stageLoading2",
					file: this._conf.FILE_STAGE_LOADING_OBJ[2],
					tex: this._stageTex[2],
					rePos: true
				}, {
					key: "stageLoading3",
					file: this._conf.FILE_STAGE_LOADING_OBJ[2],
					tex: this._stageTex[2],
					rePos: true
				}, {
					key: "stageLoading4",
					file: this._conf.FILE_STAGE_LOADING_OBJ[4],
					tex: this._stageTex[4],
					rePos: true
				}, {
					key: "stageLoading5",
					file: this._conf.FILE_STAGE_LOADING_OBJ[5],
					tex: this._stageTex[5],
					rePos: true
				}, {
					key: "stageLoading6",
					file: this._conf.FILE_STAGE_LOADING_OBJ[6],
					tex: this._stageTex[6],
					rePos: true
				}, {
					key: "seaDown",
					file: this._conf.FILE_SEADOWN_OBJ[0],
					tex: this._stageTex[5],
					rePos: true
				}, {
					key: "item0",
					file: this._conf.FILE_ITEM_OBJ[0],
					tex: this._itemTex,
					rePos: true
				}, {
					key: "item1",
					file: this._conf.FILE_ITEM_OBJ[1],
					tex: this._itemTex,
					rePos: true
				}, {
					key: "item2",
					file: this._conf.FILE_ITEM_OBJ[2],
					tex: this._itemTex,
					rePos: true
				}, {
					key: "sky0",
					file: this._conf.FILE_SKY_OBJ,
					tex: THREE.ImageUtils.loadTexture(root.MY.app.conf.FILE_SKY_TEX[0]),
					rePos: true
				}, {
					key: "cloud0",
					file: this._conf.FILE_CLOUD_OBJ[5],
					tex: this._stageTex[1],
					rePos: true
				}, {
					key: "cloud1",
					file: this._conf.FILE_CLOUD_OBJ[1],
					tex: this._stageTex[1],
					rePos: true
				}, {
					key: "cloud2",
					file: this._conf.FILE_CLOUD_OBJ[2],
					tex: this._stageTex[2],
					rePos: true
				}, {
					key: "cloud3",
					file: this._conf.FILE_CLOUD_OBJ[3],
					tex: this._stageTex[3],
					rePos: true
				}, {
					key: "cloud4",
					file: this._conf.FILE_CLOUD_OBJ[4],
					tex: this._stageTex[4],
					rePos: true
				}, {
					key: "cloud5",
					file: this._conf.FILE_CLOUD_OBJ[1],
					tex: this._stageTex[1],
					rePos: true
				}, {
					key: "cloud6",
					file: this._conf.FILE_CLOUD_OBJ[1],
					tex: this._stageTex[1],
					rePos: true
				}, {
					key: "fusha",
					file: this._conf.FILE_FUSYA_OBJ[0],
					tex: this._stageTex[0],
					rePos: false
				}, {
					key: "sea",
					file: this._conf.FILE_SEA_OBJ[0],
					tex: this._stageTex[5],
					rePos: true
				}, {
					key: "kujira",
					file: this._conf.FILE_KUJIRA_OBJ[0],
					tex: this._stageTex[5],
					rePos: true
				}, {
					key: "doorLeft",
					file: this._conf.FILE_CASTLE_OBJ[1],
					tex: this._stageTex[6],
					rePos: true
				}, {
					key: "doorRight",
					file: this._conf.FILE_CASTLE_OBJ[2],
					tex: this._stageTex[6],
					rePos: true
				}, {
					key: "stg4Etc",
					file: this._conf.FILE_BOAT_OBJ[1],
					tex: this._stageTex[4],
					rePos: true
				}, {
					key: "prestage4",
					file: this._conf.FILE_STAGE_OBJ[4],
					tex: this._stageTex[4],
					rePos: true
				}
			]);
		};

		data.prototype._makeStageTex = function() {
			var i, j, len1, ref, results, tex, val;
			ref = this._conf.FILE_STAGE_TEX;
			results = [];
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				tex = THREE.ImageUtils.loadTexture(val);
				results.push(this._stageTex[i] = tex);
			}
			return results;
		};

		data.prototype._makeEtcStageTex = function() {};

		data.prototype._makeStgpartsTex = function() {};

		data.prototype._eProgressCmnObjData = function(rate) {
			if (this.onProgress != null) {
				return this.onProgress(rate);
			}
		};

		data.prototype._eCompleteCmnObjData = function() {
			if (this.onComplete != null) {
				return this.onComplete();
			}
		};

		data.prototype.getCmnObj3D = function(key) {
			return this._cmnObjMgr.get(key).obj;
		};

		data.prototype.getStageObj3D = function(stageId, key) {
			return this._stageObjMgr[stageId].get(key).obj;
		};

		data.prototype._eCompleteMultiObjData = function() {
			if (this.onComplete != null) {
				return this.onComplete();
			}
		};

		data.prototype.loadNextStage = function(stageId, gameId, isDelay) {
			var d, interval;
			interval = stageId === 0 ? this._conf.STG_INTERVAL * 3 : this._conf.STG_INTERVAL;
			if (this._stageObjMgr[stageId] != null) {
				this._delayCall.onComplete = (function(_this) {
					return function() {
						return _this._eCompleteStageObj();
					};
				})(this);
				return this._delayCall.watchStart(interval);
			} else {
				d = isDelay ? interval : 1;
				this._delayCall.onComplete = (function(_this) {
					return function() {
						var loader;
						loader = new root.MY_CLASS.multiObjLoader();
						_this._stageObjMgr[stageId] = loader;
						loader.onProgress = _this._eProgressStageObj;
						loader.onComplete = _this._eCompleteStageObj;
						return loader.load(_this._getObjList(stageId, gameId));
					};
				})(this);
				return this._delayCall.watchStart(d);
			}
		};

		data.prototype._getObjList = function(stageId, gameId) {
			var arr;
			arr = [
				{
					key: "stage",
					file: this._conf.FILE_STAGE_OBJ[stageId],
					tex: this._stageTex[stageId],
					rePos: true
				}
			];
			return arr;
		};

		data.prototype._eProgressStageObj = function(rate) {
			if (this.onProgressNextData != null) {
				return this.onProgressNextData(rate);
			}
		};

		data.prototype._eCompleteStageObj = function() {
			if (root.MY.gl.audio != null) {
				root.MY.gl.audio.onCompleteStageBgm = this._eCompleteStgBgm;
				return root.MY.gl.audio.loadStgBgm(root.MY.gl.game.nextStageId());
			} else {
				return this._eCompleteStgBgm();
			}
		};

		data.prototype._eCompleteStgBgm = function() {
			if (this.onCompleteNextData != null) {
				return this.onCompleteNextData();
			}
		};

		return data;

	}