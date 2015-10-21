export default function() {
		function multiObjLoader() {
			this.get = bind(this.get, this);
			this._makeSearchTable = bind(this._makeSearchTable, this);
			this._eCompleteObjData = bind(this._eCompleteObjData, this);
			this._eProgressObjData = bind(this._eProgressObjData, this);
			this._loadObj = bind(this._loadObj, this);
			this.load = bind(this.load, this);
			this._list;
			this._table;
			this._loadedNum = 0;
			this.onProgress;
			this.onComplete;
		}

		multiObjLoader.prototype.load = function(list) {
			this._list = list;
			return this._loadObj();
		};

		multiObjLoader.prototype._loadObj = function() {
			var loader;
			loader = new THREE.OBJLoader();
			this._list[this._loadedNum].loader = loader;
			return loader.load(this._list[this._loadedNum].file, this._eCompleteObjData, this._eProgressObjData);
		};

		multiObjLoader.prototype._eProgressObjData = function(e) {
			if (this.onProgress != null) {
				return this.onProgress((this._loadedNum + (e.loaded / e.total)) / this._list.length);
			}
		};

		multiObjLoader.prototype._eCompleteObjData = function(obj) {
			obj.traverse((function(_this) {
				return function(child) {
					var b;
					if (child instanceof THREE.Mesh) {
						child.material.map = _this._list[_this._loadedNum].tex;
						child.material.side = THREE.DoubleSide;
						child.geometry.computeBoundingBox();
						if (_this._list[_this._loadedNum].rePos) {
							b = child.geometry.boundingBox;
							return child.position.z = -b.min.z - (b.max.z - b.min.z) * 0.5;
						}
					}
				};
			})(this));
			this._list[this._loadedNum].obj = obj;
			this._loadedNum++;
			if (this._loadedNum >= this._list.length) {
				this._makeSearchTable();
				if (this.onComplete != null) {
					return this.onComplete();
				}
			} else {
				return this._loadObj();
			}
		};

		multiObjLoader.prototype._makeSearchTable = function() {
			var i, j, len1, ref, results, val;
			this._table = {};
			ref = this._list;
			results = [];
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				results.push(this._table[val.key] = val);
			}
			return results;
		};

		multiObjLoader.prototype.get = function(key) {
			return this._table[key];
		};

		return multiObjLoader;

	}