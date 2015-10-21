export default function(superClass) {
		extend(fusha, superClass);

		function fusha() {
			this.dispose = bind(this.dispose, this);
			this.update = bind(this.update, this);
			this.start = bind(this.start, this);
			fusha.__super__.constructor.call(this, {
				addScene: false
			});
			this._mesh;
		}

		fusha.prototype.start = function() {
			fusha.__super__.start.call(this);
			this._mesh = root.MY.gl.data.getCmnObj3D("fusha").clone();
			this._container.add(this._mesh);
			this._mesh.position.x = 33;
			this._mesh.position.y = -28;
			this._mesh.position.z = 14;
			return this._mesh.rotation.y = this._u.radian(-56);
		};

		fusha.prototype.update = function() {
			fusha.__super__.update.call(this);
			return this._mesh.rotation.z += 0.01;
		};

		fusha.prototype.dispose = function() {
			if (this._mesh != null) {
				this._container.remove(this._mesh);
				this._mesh = null;
			}
			return fusha.__super__.dispose.call(this);
		};

		return fusha;

	}