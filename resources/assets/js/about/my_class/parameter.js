export default function() {
		function parameter() {
			this.set = bind(this.set, this);
			this.get = bind(this.get, this);
			this._getUseJson = bind(this._getUseJson, this);
			this.registGameParam = bind(this.registGameParam, this);
			this._eCompleteJson = bind(this._eCompleteJson, this);
			this.start = bind(this.start, this);
			this._data;
			this._debugger;
			this._conf = root.MY.app.conf;
			this._isSmt = root.MY.myfw.conf.IS_SMT;
			this.onComplete;
		}

		parameter.prototype.start = function() {
			var useJson;
			useJson = this._getUseJson();
			return $.getJSON(useJson, this._eCompleteJson);
		};

		parameter.prototype._eCompleteJson = function(e) {
			var param, useData;
			this._data = {};
			this._data.pc = e.param.pc || {};
			this._data.smt = e.param.smt || {};
			if (this._conf.TEST.DEBUGTOOL) {
				if (this._isSmt) {
					useData = this._data.smt;
					param = [
						{
							type: 0,
							name: "lifeSpd",
							def: useData.lifeSpd || 8,
							min: 0,
							max: 30,
							int: true,
							useStrg: useData.lifeSpd == null
						}, {
							type: 0,
							name: "lifeSpdAdd",
							def: useData.lifeSpdAdd || 2,
							min: 0,
							max: 10,
							int: true,
							useStrg: useData.lifeSpdAdd == null
						}, {
							type: 0,
							name: "lifeSpdMax",
							def: useData.lifeSpdMax || 50,
							min: 0,
							max: 50,
							int: true,
							useStrg: useData.lifeSpdMax == null
						}, {
							type: 0,
							name: "item",
							def: useData.itemNum || 3,
							min: 1,
							max: 7,
							int: true,
							useStrg: useData.itemNum == null
						}, {
							type: 0,
							name: "itemAdd",
							def: useData.itemAdd || 1,
							min: 0,
							max: 5,
							int: true,
							useStrg: useData.itemAdd == null
						}, {
							type: 0,
							name: "itemMax",
							def: useData.itemMax || 7,
							min: 1,
							max: 7,
							int: true,
							useStrg: useData.itemMax == null
						}, {
							type: 0,
							name: "kaihuku0",
							def: useData.kaihuku0 || 3,
							min: 0,
							max: 20,
							int: true,
							useStrg: useData.kaihuku0 == null
						}, {
							type: 0,
							name: "kaihuku1",
							def: useData.kaihuku1 || 6,
							min: 0,
							max: 20,
							int: true,
							useStrg: useData.kaihuku1 == null
						}, {
							type: 0,
							name: "kaihuku2",
							def: useData.kaihuku2 || 10,
							min: 0,
							max: 20,
							int: true,
							useStrg: useData.kaihuku2 == null
						}, {
							type: 0,
							name: "combo",
							def: useData.combo || 0.2,
							min: 0,
							max: 1,
							int: false,
							useStrg: useData.combo == null
						}, {
							type: 0,
							name: "fov",
							def: useData.fov || 45,
							min: 0,
							int: true,
							max: 90,
							useStrg: useData.fov == null
						}, {
							type: 0,
							name: "lineLife",
							def: useData.lineLife || 35,
							min: 10,
							max: 100,
							int: true,
							useStrg: useData.lineLife == null
						}, {
							type: 0,
							name: "moveX",
							def: useData.moveX || 60,
							min: 0,
							max: 200,
							int: true,
							useStrg: useData.movexpc == null
						}, {
							type: 0,
							name: "moveY",
							def: useData.moveY || 0,
							min: 0,
							max: 0,
							int: true,
							useStrg: useData.moveypc == null
						}, {
							type: 0,
							name: "moveSpeed",
							def: useData.moveSpeed || 0.1,
							min: 0.001,
							max: 1,
							useStrg: useData.moveSpeed == null
						}, {
							type: 0,
							name: "itemRangeX",
							def: useData.itemRangeX || 200,
							int: true,
							min: 80,
							max: 600,
							useStrg: useData.itemRangeX == null
						}, {
							type: 0,
							name: "itemRangeY",
							def: useData.itemRangeY || 150,
							int: true,
							min: 80,
							max: 600,
							useStrg: useData.itemRangeY == null
						}
					];
				} else {
					useData = this._data.pc;
					param = [
						{
							type: 0,
							name: "lifeSpd",
							def: useData.lifeSpd || 8,
							min: 0,
							max: 30,
							int: true,
							useStrg: useData.lifeSpd == null
						}, {
							type: 0,
							name: "lifeSpdAdd",
							def: useData.lifeSpdAdd || 2,
							min: 0,
							max: 10,
							int: true,
							useStrg: useData.lifeSpdAdd == null
						}, {
							type: 0,
							name: "lifeSpdMax",
							def: useData.lifeSpdMax || 50,
							min: 0,
							max: 100,
							int: true,
							useStrg: useData.lifeSpdMax == null
						}, {
							type: 0,
							name: "item",
							def: useData.itemNum || 3,
							min: 1,
							max: 7,
							int: true,
							useStrg: useData.itemNum == null
						}, {
							type: 0,
							name: "itemAdd",
							def: useData.itemAdd || 1,
							min: 0,
							max: 10,
							int: true,
							useStrg: useData.itemAdd == null
						}, {
							type: 0,
							name: "itemMax",
							def: useData.itemMax || 7,
							min: 1,
							max: 7,
							int: true,
							useStrg: useData.itemMax == null
						}, {
							type: 0,
							name: "kaihuku0",
							def: useData.kaihuku0 || 3,
							min: 0,
							max: 20,
							int: true,
							useStrg: useData.kaihuku0 == null
						}, {
							type: 0,
							name: "kaihuku1",
							def: useData.kaihuku1 || 6,
							min: 0,
							max: 20,
							int: true,
							useStrg: useData.kaihuku1 == null
						}, {
							type: 0,
							name: "kaihuku2",
							def: useData.kaihuku2 || 10,
							min: 0,
							max: 20,
							int: true,
							useStrg: useData.kaihuku2 == null
						}, {
							type: 0,
							name: "combo",
							def: useData.combo || 0.2,
							min: 0,
							max: 2,
							int: false,
							useStrg: useData.combo == null
						}, {
							type: 0,
							name: "moveX",
							def: useData.moveX || 30,
							min: 0,
							int: true,
							max: 200,
							useStrg: useData.movexpc == null
						}, {
							type: 0,
							name: "moveY",
							def: useData.moveY || 20,
							min: 0,
							int: true,
							max: 200,
							useStrg: useData.moveypc == null
						}, {
							type: 0,
							name: "moveSpeed",
							def: useData.moveSpeed || 0.338,
							min: 0.001,
							max: 1,
							useStrg: useData.moveSpeed == null
						}, {
							type: 0,
							name: "itemRangeX",
							def: useData.itemRangeX || 550,
							int: true,
							min: 80,
							max: 600,
							useStrg: useData.itemRangeX == null
						}, {
							type: 0,
							name: "itemRangeY",
							def: useData.itemRangeY || 200,
							int: true,
							min: 80,
							max: 600,
							useStrg: useData.itemRangeY == null
						}, {
							type: 0,
							name: "fov",
							def: useData.fov || 45,
							min: 0,
							int: true,
							max: 90,
							useStrg: useData.fov == null
						}, {
							type: 0,
							name: "lineLife",
							def: useData.lineLife || 35,
							min: 10,
							max: 100,
							int: true,
							useStrg: useData.lineLife == null
						}
					];
				}
				this._debugger = new root._LIBS.debugView($("#debug"), param);
				this._debugger.onChange = this._eChangeDebug;
				this._debugger.setup();
			} else {
				if (root.MY.myfw.conf.IS_IOSUiView || root.MY.myfw.conf.IS_ADR) {
					this._data.smt.moveX = 0;
					this._data.smt.itemRangeX = 150;
				}
			}
			if (this.onComplete != null) {
				return this.onComplete();
			}
		};

		parameter.prototype.registGameParam = function(gameLevel) {
			var arr;
			arr = [
				{
					name: "lifeSpd",
					offset: "lifeSpdAdd",
					max: "lifeSpdMax"
				}, {
					name: "item",
					offset: "itemAdd",
					max: "itemMax"
				}
			];
			return gameLevel.registParam(arr);
		};

		parameter.prototype._getUseJson = function() {
			if (this._conf.TEST.DEBUGTOOL) {
				return this._conf.PATH_JSON.PARAM + "test.json";
			} else {
				return this._conf.FILE_FIX_PARAM;
			}
		};

		parameter.prototype.get = function(name) {
			if (this._conf.TEST.DEBUGTOOL) {
				return this._debugger.get(name);
			} else {
				if (this._isSmt) {
					return this._data.smt[name] || 0;
				} else {
					return this._data.pc[name] || 0;
				}
			}
		};

		parameter.prototype.set = function(name, val) {
			if (this._conf.TEST.DEBUGTOOL) {
				return this._debugger.set(name, val);
			} else {
				if (this._isSmt) {
					return this._data.smt[name] = val;
				} else {
					return this._data.pc[name] = val;
				}
			}
		};

		return parameter;

	}