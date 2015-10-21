export default function(superClass) {
		extend(sky, superClass);

		function sky() {
			this.setSky = bind(this.setSky, this);
			this.dispose = bind(this.dispose, this);
			this.update = bind(this.update, this);
			this.start = bind(this.start, this);
			sky.__super__.constructor.call(this);
			this._scale = this._conf.SKY_SCALE[this._device];
			this._soraList = [];
			this._nextStageId = 0;
			this._prevStageId = 0;
		}

		sky.prototype.start = function() {
			var i, num, sora;
			sky.__super__.start.call(this);
			i = 0;
			num = 1;
			while (i < num) {
				sora = this._data.getCmnObj3D("sky" + String(i)).clone();
				sora.children[0].material.side = THREE.BackSide;
				this._container.add(sora);
				this._soraList.push(sora);
				sora.position.y = -400;
				sora.visible = true;
				i++;
			}
			return this._container.scale.set(this._scale, this._scale, this._scale);
		};

		sky.prototype.update = function() {
			sky.__super__.update.call(this);
			if (this._container.visible) {
				this._container.position.z = this._camera.position.z;
				return this._container.rotation.z = this._camera.rotation.z;
			}
		};

		sky.prototype.dispose = function() {
			var i, j, len1, ref, val;
			if (this._soraList != null) {
				ref = this._soraList;
				for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
					val = ref[i];
					this._container.remove(val);
				}
				this._soraList = null;
			}
			return sky.__super__.dispose.call(this);
		};

		sky.prototype.setSky = function(stageId, animate) {
			var i, j, len1, ref, results, val;
			return;
			this._prevStageId = this._nextStageId;
			this._nextStageId = stageId;
			ref = this._soraList;
			results = [];
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				if (animate) {
					val.visible = i === this._nextStageId || i === this._prevStageId;
					if (i === this._nextStageId) {
						results.push(val.children[0].material.opacity = 0);
					} else if (i === this._prevStageId) {
						results.push(val.children[0].material.opacity = 1);
					} else {
						results.push(void 0);
					}
				} else {
					results.push(val.visible = i === this._nextStageId);
				}
			}
			return results;
		};

		return sky;

	}