export default function(superClass) {
		extend(sea, superClass);

		function sea() {
			this.dispose = bind(this.dispose, this);
			this.update = bind(this.update, this);
			this.start = bind(this.start, this);
			sea.__super__.constructor.call(this);
			this._obj;
		}

		sea.prototype.start = function() {
			var depth, orgObj;
			sea.__super__.start.call(this);
			orgObj = this._data.getCmnObj3D("sea");
			this._obj = orgObj.clone();
			this._obj.children[0].material.side = THREE.BackSide;
			this._container.add(this._obj);
			this._container.scale.set(this._conf.GROUND_SCALE, this._conf.GROUND_SCALE, this._conf.GROUND_SCALE);
			return depth = this.depthFromBBox(this._obj.children[0].geometry.boundingBox);
		};

		sea.prototype.update = function() {
			sea.__super__.update.call(this);
			if (this._container.visible) {
				this._container.position.z = this._camera.position.z + 700;
				return this._container.rotation.z = this._camera.rotation.z + this._u.radian(0);
			}
		};

		sea.prototype.dispose = function() {
			if (this._obj != null) {
				this._container.remove(this._obj);
				this._obj = null;
			}
			return sea.__super__.dispose.call(this);
		};

		return sea;

	}