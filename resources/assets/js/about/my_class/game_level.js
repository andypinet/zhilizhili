export default function() {
		function gameLevel() {
			this.registParam = bind(this.registParam, this);
			this.levelUp = bind(this.levelUp, this);
			this.reset = bind(this.reset, this);
			this.start = bind(this.start, this);
			this._parameter;
			this._gameParam = [];
		}

		gameLevel.prototype.start = function() {
			return this._parameter = root.MY.gl.parameter;
		};

		gameLevel.prototype.reset = function() {
			var i, j, len1, ref, results, val;
			ref = this._gameParam;
			results = [];
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				results.push(this._parameter.set(val.name, val["default"]));
			}
			return results;
		};

		gameLevel.prototype.levelUp = function(clearStageNum) {
			var i, j, len1, num, ref, results, val;
			ref = this._gameParam;
			results = [];
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				num = this._parameter.get(val.name) + (this._parameter.get(val.offset) * clearStageNum);
				num = Math.min(num, this._parameter.get(val.max));
				results.push(this._parameter.set(val.name, num));
			}
			return results;
		};

		gameLevel.prototype.registParam = function(arr) {
			var i, j, len1, results, val;
			results = [];
			for (i = j = 0, len1 = arr.length; j < len1; i = ++j) {
				val = arr[i];
				results.push(this._gameParam.push({
					name: val.name,
					offset: val.offset,
					max: val.max,
					"default": this._parameter.get(val.name)
				}));
			}
			return results;
		};

		return gameLevel;

	}