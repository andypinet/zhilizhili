export default function() {
		function myObject3D(option) {
			this.hide = bind(this.hide, this);
			this.show = bind(this.show, this);
			this.depthFromBBox = bind(this.depthFromBBox, this);
			this.heightFromBBox = bind(this.heightFromBBox, this);
			this.widthFromBBox = bind(this.widthFromBBox, this);
			this.container = bind(this.container, this);
			this.reset = bind(this.reset, this);
			this.dispose = bind(this.dispose, this);
			this.update = bind(this.update, this);
			this.start = bind(this.start, this);
			this._option = option || {};
			this._scene;
			this._camera;
			this._parameter;
			this._interaction;
			this._audio;
			this._container;
			this._u = root.MY.myfw.util;
			this._isSmt = root.MY.myfw.conf.IS_SMT;
			this._device = this._isSmt ? 1 : 0;
			this._conf = root.MY.app.conf;
			this._cnt = 0;
		}

		myObject3D.prototype.start = function() {
			this._option.addScene = this._option.addScene || true;
			this._scene = root.MY.gl.scene;
			this._camera = root.MY.gl.camera;
			this._parameter = root.MY.gl.parameter;
			this._interaction = root.MY.gl.interaction;
			this._audio = root.MY.gl.audio;
			this._data = root.MY.gl.data;
			this._game = root.MY.gl.game;
			this._container = new THREE.Object3D();
			if (this._option.addScene) {
				this._scene.add(this._container);
				this._container.visible = false;
			}
			return root.MY.myfw.addUpdate(this.update);
		};

		myObject3D.prototype.update = function() {};

		myObject3D.prototype.dispose = function() {
			root.MY.myfw.delUpdate(this.update);
			if ((this._container != null) && this._option.addScene) {
				this._scene.remove(this._container);
				this._container = null;
			}
			this._scene = null;
			this._camera = null;
			this._parameter = null;
			this._interaction = null;
			this._game = null;
			this._data = null;
			this._audio = null;
			this._u = null;
			this._conf = null;
			return this._option = null;
		};

		myObject3D.prototype.reset = function() {};

		myObject3D.prototype.container = function() {
			return this._container;
		};

		myObject3D.prototype.widthFromBBox = function(b) {
			return b.max.x - b.min.x;
		};

		myObject3D.prototype.heightFromBBox = function(b) {
			return b.max.y - b.min.y;
		};

		myObject3D.prototype.depthFromBBox = function(b) {
			return b.max.z - b.min.z;
		};

		myObject3D.prototype.show = function() {
			this._container.visible = true;
			return this.update();
		};

		myObject3D.prototype.hide = function() {
			return this._container.visible = false;
		};

		return myObject3D;

	}