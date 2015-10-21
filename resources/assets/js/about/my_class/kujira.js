export default function(superClass) {
		extend(kujira, superClass);

		function kujira(key) {
			this.dispose = bind(this.dispose, this);
			this.show = bind(this.show, this);
			this.update = bind(this.update, this);
			this.start = bind(this.start, this);
			kujira.__super__.constructor.call(this, {
				addScene: false
			});
			this._key = key;
			this._mesh;
			this._pos = [[0, -100, -120, 1], [300, -110, 200, 0.6], [300, -200, -350, 0.5], [-150, -200, 400, 0.35], [0, -300, 100, 0.4]];
			this._spdX;
			this._spdY;
		}

		kujira.prototype.start = function() {
			kujira.__super__.start.call(this);
			this._mesh = root.MY.gl.data.getCmnObj3D("kujira").clone();
			this._container.add(this._mesh);
			this._spdX = -this._u.random(10, 400) / 1000;
			return this._spdY = this._u.random(100, 200) / 10000;
		};

		kujira.prototype.update = function() {
			kujira.__super__.update.call(this);
			if (this._container.visible) {
				this._mesh.position.x += this._spdX;
				return this._mesh.position.y += this._spdY;
			}
		};

		kujira.prototype.show = function() {
			var p;
			kujira.__super__.show.call(this);
			p = this._pos[this._key];
			this._mesh.position.x = p[0] + 400;
			this._mesh.position.y = p[1];
			this._mesh.position.z = p[2] - 400;
			return this._mesh.scale.set(p[3], p[3], p[3]);
		};

		kujira.prototype.dispose = function() {
			if (this._mesh != null) {
				this._container.remove(this._mesh);
				this._mesh = null;
			}
			return kujira.__super__.dispose.call(this);
		};

		return kujira;

	}