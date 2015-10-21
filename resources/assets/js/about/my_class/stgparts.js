export default function(superClass) {
		extend(stgparts, superClass);

		function stgparts() {
			this.dispose = bind(this.dispose, this);
			this.update = bind(this.update, this);
			this.hide = bind(this.hide, this);
			this.show = bind(this.show, this);
			this.start = bind(this.start, this);
			stgparts.__super__.constructor.call(this);
			this._scale = 7;
			this._obj;
		}

		stgparts.prototype.start = function() {
			var orgObj;
			stgparts.__super__.start.call(this);
			orgObj = root.MY.gl.data.getCmnObj3D("cloud");
			this._obj = orgObj.clone();
			this._container.add(this._obj);
			this._obj.rotation.x = this._u.radian(180);
			this._obj.rotation.y = this._u.radian(-180);
			this._obj.rotation.z = this._u.radian(-90);
			this._obj.scale.set(this._scale, this._scale, this._scale);
			return this._container.visible = false;
		};

		stgparts.prototype.show = function(pos) {
			this._container.position.copy(pos);
			return this._container.visible = true;
		};

		stgparts.prototype.hide = function() {
			return this._container.visible = false;
		};

		stgparts.prototype.update = function() {
			return stgparts.__super__.update.call(this);
		};

		stgparts.prototype.dispose = function() {
			if (this._obj != null) {
				this._container.remove(this._obj);
				this._obj = null;
			}
			return stgparts.__super__.dispose.call(this);
		};

		return stgparts;

	}