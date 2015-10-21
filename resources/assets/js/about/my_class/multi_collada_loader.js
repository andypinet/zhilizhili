export default function() {
		function multiColladaLoader() {
			this.get = bind(this.get, this);
			this._makeSearchTable = bind(this._makeSearchTable, this);
			this._eCompleteData = bind(this._eCompleteData, this);
			this._eProgressData = bind(this._eProgressData, this);
			this._loadCollada = bind(this._loadCollada, this);
			this.load = bind(this.load, this);
			this._list;
			this._table;
			this._loadedNum = 0;
			this.onProgress;
			this.onComplete;
		}

		multiColladaLoader.prototype.load = function(list) {
			this._list = list;
			return this._loadCollada();
		};

		multiColladaLoader.prototype._loadCollada = function() {
			var loader;
			loader = new THREE.ColladaLoader();
			this._list[this._loadedNum].loader = loader;
			return loader.load(this._list[this._loadedNum].file, this._eCompleteData, this._eProgressData);
		};

		multiColladaLoader.prototype._eProgressData = function(e) {
			if (this.onProgress != null) {
				return this.onProgress((this._loadedNum + (e.loaded / e.total)) / this._list.length);
			}
		};

		multiColladaLoader.prototype._eCompleteData = function(collada) {
			var b, i, j, len1, ref, val;
			this._list[this._loadedNum].obj = collada.scene;
			collada.scene.traverse((function(_this) {
				return function(child) {
					var animation;
					if (child instanceof THREE.SkinnedMesh) {
						animation = new THREE.Animation(child, child.geometry.animation);
						animation.play();
						return _this._list[_this._loadedNum].anm = animation;
					}
				};
			})(this));
			ref = collada.skins;
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				val.material.map = this._list[this._loadedNum].tex;
				val.material.side = THREE.DoubleSide;
				val.geometry.computeBoundingBox();
				if (this._list[this._loadedNum].rePos) {
					b = val.geometry.boundingBox;
					val.position.z = -b.min.z - (b.max.z - b.min.z) * 0.5;
				}
			}
			this._loadedNum++;
			if (this._loadedNum >= this._list.length) {
				this._makeSearchTable();
				if (this.onComplete != null) {
					return this.onComplete();
				}
			} else {
				return this._loadCollada();
			}
		};

		multiColladaLoader.prototype._makeSearchTable = function() {
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

		multiColladaLoader.prototype.get = function(key) {
			return this._table[key];
		};

		return multiColladaLoader;

	}